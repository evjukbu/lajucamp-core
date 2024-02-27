<template>
    <CardLikeContainer>
        <!--<h1 class="text-3xl pb-3">Veranstaltungen</h1>-->
        <select v-model="selected" class="select select-primary w-full">
            <option>Veranstaltungen</option>
            <option>Kategorien</option>
        </select>
        <SplittedEventList class="h-full" v-if="getViewMode() === 0" />
        <CategoryList v-if="getViewMode() === 1" />
    </CardLikeContainer>
</template>

<script setup>
const selected = ref("Veranstaltungen")

function getViewMode() {
    if (selected.value === "Veranstaltungen") {
        return 0
    } else {
        return 1
    }
}
</script>