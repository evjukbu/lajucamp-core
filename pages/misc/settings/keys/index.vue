<template>
    <CardLikeContainer>
        <h1 class="text-3xl">Berechtigungsschlüssel</h1>
        <div class="alert alert-info" v-if="cookie === undefined || hackyCookieWorkaround() === []">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Berechtigungsschlüssel erlauben es, zusätzliche Features in der App freizuschalten. Wende dich an den
                Veranstalter, um Berechtigungsschlüssel zu erhalten.</span>
        </div>

        <router-link to="/misc/settings/keys/add">
            <div class="btn btn-block btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path
                        d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>

                Berechtigungsschlüssel einlösen
            </div>
        </router-link>

        <AccessKeyListEntry v-for="(entry, index) in hackyCookieWorkaround()" :key="entry.id" :accesskey="entry" @delete="deleteKey(index)"/>
    </CardLikeContainer>
</template>

<script setup>
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

async function deleteKey(i) {
    let temp = hackyCookieWorkaround()
    temp.splice(i, 1)
    cookie.value = JSON.stringify(temp, null, 2)
}

function hackyCookieWorkaround() {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}
</script>