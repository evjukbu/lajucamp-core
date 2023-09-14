<template>
    <ul class="menu menu-lg">
        <MenuEntry name="Berechtigungsschlüssel" to="/misc/settings/keys">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
        </MenuEntry>
        <MenuEntry name="Design" to="/misc/settings/appearance">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>

        </MenuEntry>
        <MenuEntry v-if="checkDevelAccess()" name="Entwicklerinformationen" to="/test">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        </MenuEntry>
        <MenuEntry v-if="checkPictureAccess()" name="Bildergalerie" to="/pictures">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

        </MenuEntry>
        <div v-if="records !== []">
            <div v-for="record in records" :key="record.id">
                <MenuEntry v-if="checkAccessKey(record)" :name="record.name"
                    :to="(record.redirectUrl !== '') ? record.redirectUrl : '/misc/page-' + record.id">
                    <div v-html="record.icon"></div>
                </MenuEntry>
            </div>
        </div>

        <MenuEntry name="Über diese App" to="/misc/about">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        </MenuEntry>



    </ul>
    <!-- Div that is always at the bottom of the page-->




    <div class="fixed bottom-20 w-full flex flex-col justify-center">
        <span class="text-center font-light text-sm">Unterstützt durch</span>
        <figure class="flex justify-center w-full">
            <img src="~assets/hds.png" class="w-1/4" />
        </figure>

    </div>
</template>

<script setup>
const pageManager = usePageManager()
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

let records = ref([])

onMounted(async () => {
    records.value = await pageManager.getList()
})

function hackyCookieWorkaround() {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}

function checkDevelAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.enableDevelResources === true)
}

function checkPictureAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowImages === true)
}

function checkAccessKey(record) {
    if (!record.needsFeatureKey) {
        console.log("Allow because no featureKey set")
        return true
    }
    else {
        if (cookie === undefined || cookie.value === undefined) {
            console.log("Deny because no cookie set")
            return false
        }
        else {
            console.log("Check if cookie contains featureKey")
            return cookie.value.some(obj => obj.id === record.featureKey)
        }
    }

}
</script>
