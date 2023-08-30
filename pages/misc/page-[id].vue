<template>
    <CardLikeContainer v-if="page !== null">
        <h1 class="text-3xl">{{ page.name }}</h1>
        <p class="prose" v-html="page.content"></p>
    </CardLikeContainer>
    <div v-else class="flex items-center h-screen">
        <span class="mx-auto loading loading-dots loading-lg"></span>
    </div>
</template>

<script setup>
const route = useRoute()
const pageManager = usePageManager()
const page = ref(null)

onMounted(async () => {
    page.value = await pageManager.getById(route.params.id)
})

</script>