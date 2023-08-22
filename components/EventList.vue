<template>
    <div v-if="records != null">
        <EventListEntry v-for="item in records" :key="item.id" :item="item" />
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in (parseInt((props.limit !== undefined) ? props.limit : 8))" :key="i" />
    </div>
</template>

<script setup>
const pb = usePocketBase()

const props = defineProps(["limit", "homepage"])
let records = ref(null)
let locations = reactive({})
let categories = reactive({})

onMounted(async () => {
    let r = null
    let result = null
    let options = {
        sort: 'start',
        filter: 'end >= "' + new Date().toISOString().replace('T', ' ').slice(0, -5) + '"',
        expand: 'category,location'
    }
    if (props.homepage !== undefined) {
        options.filter = options.filter + " && homepage_ignore = false"
    }
    if (props.limit === undefined) {
        r = await pb.collection('events').getFullList(options);
        result = r
    } else {
        r = await pb.collection('events').getList(1, props.limit, options);
        result = r.items
    }
    records.value = result
})

</script>