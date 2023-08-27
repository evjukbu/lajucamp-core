<template>
    <EventListEntry v-for="item in items" :key="item.id" :item="item" />
</template>

<script setup>
const props = defineProps(['items'])
</script>