<template>
    <EventListEntry v-for="item in items" :key="item.id" :item="item" :categories="categories" :locations="locations" />
</template>

<script setup>
const props = defineProps(['items', 'categories', 'locations'])
</script>