<template>
    <div class="alert alert-info">
        <span>Filter sind angewendet. Nicht alle Veranstaltungen werden angezeigt.</span>
    </div>
    <FilteredEventList :items="records" :locations="locations" :categories="categories" />
</template>

<script setup>
import FilteredEventList from '../../components/FilteredEventList.vue';

const route = useRoute()
const pb = usePocketBase();

const records = ref(null);
let locations = reactive({})
let categories = reactive({})
onMounted(async () => {
    const r = await pb.collection('events').getFullList({
        sort: '-start',
        filter: 'category = "' + route.params.id + '"'
    });
    for (const record of r) {
        const l = await pb.collection('locations').getOne(record.location)
        locations[l.id] = l
        const c = await pb.collection('categories').getOne(record.category)
        categories[c.id] = c
    }
    records.value = r
});

</script>