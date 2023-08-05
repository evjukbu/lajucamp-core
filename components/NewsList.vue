<template>
<div v-if="posts != null">
    <NewsListCard v-for="post in posts" :key="post.id" :post="post" />
</div>
<div v-else class="flex items-center h-screen">
        <span class="mx-auto loading loading-dots loading-lg"></span>
</div>
</template>

<script setup>

const pb = usePocketBase()
const props = defineProps(["maxPosts"])
let posts = ref(null)

onMounted(async () => {
    if (props.maxPosts == undefined) {
        posts.value = await pb.collection('posts').getFullList({
            sort: '-created',
        })
    } else {
        const resultList = await pb.collection('posts').getList(0, props.maxPosts, {
            sort: '-created',
        })
        posts.value = resultList.items
    }

})


</script>