<template>
    <PictureGalleryEntry class="flex flex-col space-y-3" v-for="item in props.items" :key="item.id" :picture="item" />
</template>

<script setup>
const props = defineProps(["items"])
</script>