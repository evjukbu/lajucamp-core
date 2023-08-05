<template>
    <div v-if="records != null">
        <MusicListEntry v-for="item in records" :key="item.id" :item="item" />
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const pb = usePocketBase()

const props = defineProps(["limit"])
let records = ref(null)

onMounted(async () => {
    records.value = await pb.collection('songs').getFullList({
    sort: 'number',
});
})

</script>