<template>
    <div class="bg-base-100 shadow-xl rounded-xl">
        <figure><img class="rounded-xl" :src="pb.files.getUrl(picture, picture.file)" alt="Image" /></figure>
    </div>
</template>

<script setup>
const pb = usePocketBase()
const props = defineProps(["picture"])
</script>