<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Schlüssel hinzufügen</h1>
        <ul class="steps">
            <li :class="'step ' + ((step >= 0) ? 'step-primary' : '')">Schlüssel eingeben</li>
            <li :class="'step ' + ((step >= 1) ? 'step-primary' : '')">Schlüssel bestätigen</li>
            <li :class="'step ' + ((step >= 2) ? 'step-primary' : '')">Schlüssel aktivieren</li>
        </ul>
        <div v-show="step === 0">
            <div v-show="showErrorMessage">
                <div class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="stroke-current shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Der Berechtigungsschlüssel ist ungültig.</span>
                </div>
                <br />
            </div>

            <input v-model="key" type="text" placeholder="Berechtigungsschlüssel eingeben"
                class="input input-bordered w-full" />
            <div class="flex justify-end py-4">
                <div :disabled="(key === '') ? 1 : False" class="btn btn-primary" @click="validate">Weiter</div>
            </div>
        </div>
        <div v-if="step === 1">
            <p class="py-3">Möchtest du diesen Schlüssel aktivieren?</p>
            <AccessKeyCard class="py-3" :accesskey="record" />
            <div class="flex justify-end py-4 space-x-2">
                <div class="btn" @click="step = 0">Zurück</div>
                <div class="btn btn-primary" @click="confirm">Weiter</div>
            </div>
        </div>
        <div v-show="step === 2">
            <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>

            </div>
            <p class="py-3 text-center">Der Schlüssel wurde erfolgreich aktiviert.</p>

            <div class="flex justify-end py-4 space-x-2">
                <router-link to="/misc/keys">
                    <div class="btn btn-primary">Fertig</div>
                </router-link>
            </div>
        </div>
    </CardLikeContainer>
</template>

<script setup>
const step = ref(0)
const key = ref("")
const pb = usePocketBase()
const showErrorMessage = ref(false)
let record = null

const cookie = useCookie("keys", { expires: new Date('9999-12-31') })


async function validate() {
    try {
        record = await pb.collection('keys').getOne(key.value)
    } catch (error) {
        showErrorMessage.value = true
        key.value = ""
        return false
    }
    step.value = 1
    return true
}

async function confirm() {
    step.value = 2
    if (cookie.value === undefined) {
        cookie.value = []
    }
    let temp = cookie.value
    temp.push(record)
    cookie.value = JSON.stringify(temp, null, 2)
    console.log(cookie.value)
}
</script>