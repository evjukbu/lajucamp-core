<template>
  <li>
    <RouterLink to="/admin/user" :class="checkActiveMenu('admin-user')">
      <div class="flex flex-row space-x-2">
        <div class="avatar placeholder left-0 -left-3">
          <div class="w-12 rounded-full">
            <img v-if="pb.authStore.model.avatar !== ''"
              :src="pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar)" />
            <img v-else :src="'https://api.dicebear.com/7.x/initials/svg?seed=' +
              pb.authStore.model.name
              " />
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-light">Angemeldet als</span>
          <span>{{ pb.authStore.model.name }}</span>
          {{}}
        </div>
      </div>
    </RouterLink>
  </li>
  <div class="divider"></div>
</template>

<script setup>
const pb = usePocketBase();
const route = useRoute();

function checkActiveMenu(name) {
  if (route.name === name) {
    return "active";
  } else {
    return "";
  }
}
</script>
