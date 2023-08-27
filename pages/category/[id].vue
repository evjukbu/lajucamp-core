<template>
    <div class="alert alert-info">
        <span>Filter sind angewendet. Nicht alle Veranstaltungen werden angezeigt.</span>
    </div>
    <FilteredEventList :items="records" />
</template>

<script setup>
import FilteredEventList from '../../components/FilteredEventList.vue';

const route = useRoute()
const pb = usePocketBase();

const records = ref(null);
onMounted(async () => {
    const r = await pb.collection('events').getFullList({
        sort: '-start',
        filter: 'category = "' + route.params.id + '"',
        expand: 'category,location'
    });
    records.value = r
});

</script>