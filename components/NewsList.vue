<template>
    <div v-if="posts != null" class="flex flex-col space-y-3">
        <NewsListCard v-if="posts.length > 0" v-for="post in posts" :key="post.id" :post="post" />

        <div v-else class="flex items-center h-screen">
            <span class="mx-auto text-sm font-light">Aktuell keine Beiträge</span>
        </div>
    </div>
    <div v-else class="flex items-center h-screen">
        <span class="mx-auto loading loading-dots loading-lg"></span>
    </div>
</template>

<script setup>

const pb = usePocketBase()
const postManager = usePostManager()
const props = defineProps(["maxPosts"])
let posts = ref(null)

onMounted(async () => {
    let something = await postManager.getList()
    if (props.maxPosts == undefined) {
        posts.value = await postManager.getList()
    } else {
        const resultList = await postManager.getList(props.maxPosts)
        posts.value = resultList.items
    }

})


</script>