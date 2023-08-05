<template>
    <select v-model="selected" class="select select-primary w-full">
        <option>Veranstaltungen</option>
        <option>Kategorien</option>
    </select>
    <EventList v-show="selected === 'Veranstaltungen'"/>
    <CategoryList v-show="selected === 'Kategorien'"/>
</template>

<script setup>
const selected = ref("Veranstaltungen")
</script>