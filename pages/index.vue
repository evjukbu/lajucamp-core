<template>
    <div class="flex flex-col space-y-3 pb-3">
        <HomePageOfflineCard v-if="!online"/>
        <HomepageWelcomeCardBundle />
        <HomepageEventListCard v-if="!config.public.disableEvents" />
        <HomepageRestrictedCard v-else />
        <SingleNewsCard />
        <HomepageInstallCard />
    </div>
</template>

<script setup>
import { useOnline } from "@vueuse/core"

const route = useRoute()
const config = useRuntimeConfig()
const cookie = useCookie("installed", { expires: new Date('9999-12-31') })
const online = useOnline()
if (route.query.standalone === 'true') {
    cookie.value = true
}
</script>
