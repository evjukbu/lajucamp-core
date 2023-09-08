<template>
    <div v-if="song !== null">

        <CardLikeContainer>
            <h1 class="text-3xl">{{ song.name }}</h1>
            <span class="font-light text-sm">{{ song.author }}</span>
        </CardLikeContainer>
        <img v-for="image in song.image" class="rounded-xl pb-3" :src="pb.files.getUrl(song, image)" alt="Bild" />

    </div>
</template>

<script setup>
const route = useRoute()
const pb = usePocketBase()
const song = ref(null)

onMounted(async () => {
    song.value = await pb.collection('songs').getOne(route.params.id)
})
</script>