<template>
    <div class="flex flex-col space-y-3">
        <HomepageWelcomeCardBundle />
        <HomepageEventListCard />
        <SingleNewsCard />
        <HomepageInstallCard />
    </div>
</template>

<script setup>
const route = useRoute()
const cookie = useCookie("installed", { expires: new Date('9999-12-31') })
if (route.query.standalone === 'true') {
    cookie.value = true
}
</script>
