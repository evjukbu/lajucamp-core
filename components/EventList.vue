<template>
    <div v-if="records != null">
        <EventListEntry v-for="item in records" :key="item.id" :item="item" :locations="locations"
            :categories="categories" />
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in (parseInt((props.limit !== undefined) ? props.limit : 8))" :key="i" />
    </div>
</template>

<script setup>
const pb = usePocketBase()

const props = defineProps(["limit"])
let records = ref(null)
let locations = reactive({})
let categories = reactive({})

onMounted(async () => {
    let r = null
    let result = null
    if (props.limit === undefined) {
        r = await pb.collection('events').getFullList({
            sort: 'start',
            filter: 'end >= "' + new Date().toISOString().replace('T', ' ').slice(0, -5) + '"'
        });
        result = r
    } else {
        r = await pb.collection('events').getList(1, props.limit, {
            sort: 'start',
            filter: 'end >= "' + new Date().toISOString().replace('T', ' ').slice(0, -5) + '"'
        });
        result = r.items
    }

    for (const record of result) {
        const l = await pb.collection('locations').getOne(record.location)
        locations[l.id] = l
        const c = await pb.collection('categories').getOne(record.category)
        categories[c.id] = c
    }
    records.value = result
})

</script>