<template>
    <div class="alert alert-info">
        <span>Filter sind angewendet. Nicht alle Veranstaltungen werden angezeigt.</span>
    </div>
    <FilteredEventList :items="records" />
</template>

<script setup>
import FilteredEventList from '../../components/FilteredEventList.vue';

const route = useRoute()
const eventManager = useEventManager()
const records = ref(null);
onMounted(async () => {
    records.value = await eventManager.getByCategory(route.params.id)
});

</script>