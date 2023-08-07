<template>
    <ul class="menu menu-lg">
        <MenuEntry name="Berechtigungsschlüssel" to="/misc/keys">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
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


    </ul>
</template>

<script setup>
const pocketbase = usePocketBase()
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

let records = ref([])

onMounted(async () => {
    records.value = await pocketbase.collection('pages').getFullList({});
})


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