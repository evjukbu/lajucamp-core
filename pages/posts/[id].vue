<template>
    <div v-if="post != null">
        <CardLikeContainer>
            <h1 class="text-3xl">{{ post.title }}</h1>
            <span class="text-sm font-light">{{ post.author }} veröffentlichte {{ getRelativeTime(new Date(post.created))
            }}</span>
            <div class="bg-base-100 shadow-xl rounded-xl">
                <figure><img class="rounded-xl" :src="pb.files.getUrl(post, post.image)" alt="Image" /></figure>
            </div>
            <p class="prose" v-html="post.text"></p>
        </CardLikeContainer>

    </div>
    <div v-else class="flex items-center h-screen">
        <span class="mx-auto loading loading-dots loading-lg"></span>
    </div>
</template>

<script setup>
const route = useRoute()
const pb = usePocketBase()
let post = ref(null)

onMounted(async () => {
    post.value = await pb.collection('posts').getOne(route.params.id)
})

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}


const rtf = new Intl.RelativeTimeFormat('de', { numeric: 'auto' })

var getRelativeTime = (d2) => {
    var elapsed = d2 - new Date()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}

</script>