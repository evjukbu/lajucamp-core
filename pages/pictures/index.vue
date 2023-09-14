<template>
    <CardLikeContainer>
        <h1 class="text-3xl">Bildergalerie</h1>
        <PictureGallery :items="data" />
    </CardLikeContainer>
</template>

<script setup>
const pictureManager = usePictureManager()
const data = ref([])

onMounted(async () => {
    data.value = await pictureManager.getList()
})
</script>