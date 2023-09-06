<template>
    <div v-if="records != null">
        <div class="pb-6" v-for="item in records" :key="item.id" :item="item">
            <span class="text-sm font-light">{{ item.day }}</span>
            <EventListEntry v-for="event in item.events" :key="event.id" :item="event" />
        </div>
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const eventManager = useEventManager()
let records = ref(null)


onMounted(async () => {
    records.value = await eventManager.getDayList()
})

</script>