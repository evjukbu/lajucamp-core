<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Veranstaltungen</h1>
        <select v-model="selected" class="select select-primary w-full">
            <option>Veranstaltungen</option>
            <option>Kategorien</option>
        </select>
        <EventList v-show="selected === 'Veranstaltungen'" />
        <CategoryList v-show="selected === 'Kategorien'" />
    </CardLikeContainer>
</template>

<script setup>
const selected = ref("Veranstaltungen")
</script>