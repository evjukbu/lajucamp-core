<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex flex-row space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>

      <span class="font-bold mb-8">Melde dich im Admin-Bereich an.</span>
    </div>
    <div class="bg-base-100 w-4/12 flex flex-row shadow-lg rounded-md">
      <div class="h-96 w-full">
        <img src="~assets/kdw.jpg" class="w-full h-full object-cover rounded-s-md" />
      </div>
      <div class="h-96 w-full">
        <form id="login" class="p-8">
          <label class="label">
            <span class="label-text">Benutzername</span>
          </label>
          <input :disabled="loading" type="text" placeholder="Benutzername" v-model="username"
            class="input input-bordered w-full" @keyup.enter="focusPassword()" />
          <label class="label">
            <span class="label-text">Passwort</span>
          </label>
          <input :disabled="loading" type="password" placeholder="Passwort" v-model="password"
            class="input input-bordered w-full" @keyup.enter="login()" ref="passwordInput" />
          <div v-if="!loading" class="btn btn-primary mt-8 w-full" @click="login()">
            Anmelden
          </div>
          <div v-else class="btn btn-primary mt-8 w-full btn-disabled">
            <span class="loading loading-spinner"></span>
            Bitte warten...
          </div>
          <span v-if="wrong" class="font-light text-red-600 text-sm">Falsche Zugansdaten.</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const pb = usePocketBase();
const wrong = ref(false);
const authData = ref();
const username = ref("");
const password = ref("");

const loading = ref(false);
definePageMeta({
  layout: "blank",
});

const passwordInput = ref(null);

function focusPassword() {
  passwordInput.value.focus();
}

async function login() {
  loading.value = true;
  wrong.value = false;
  let data = null;
  try {
    data = await pb.collection("users").authWithPassword(username.value, password.value);
  } catch {
    wrong.value = true;
    loading.value = false;
  }
  if (data) {
    if (route.query.redirect !== undefined) {
      await navigateTo(route.query.redirect)
    } else {
      await navigateTo("/admin");
    }
  }
}
</script>
