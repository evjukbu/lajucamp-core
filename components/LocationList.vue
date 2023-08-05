<template>
    <div v-if="locations != null">
        <LocationListEntry v-for="location in locations" :key="location.id" :location="location" />
    </div>
</template>

<script setup>
const pb = usePocketBase();

const locations = ref(null);

onMounted(async () => {
  locations.value = await pb.collection('locations').getFullList();
});
</script>