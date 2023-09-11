<template>
    <div v-if="records != null">
        <EventListEntry v-if="records.length > 0" v-for="item in records" :key="item.id" :item="item" />
        <span class="text-sm font-light text-center" v-else>Aktuell keine Veranstaltungen</span>
    </div>
    <div v-else>
        <EventListEntrySkeleton v-for="i in (parseInt((props.limit !== undefined) ? props.limit : 8))" :key="i" />
    </div>
</template>

<script setup>
const props = defineProps(["limit", "homepage"])
const eventManager = useEventManager()
let records = ref(null)


onMounted(async () => {
    console.log(props)
    if (props.homepage !== "") {
        if (props.limit === undefined) {
            records.value = await eventManager.getList()
        } else {
            records.value = await eventManager.getList(props.limit)
        }
    } else {
        if (props.limit === undefined) {
            records.value = await eventManager.getUpcomingHomepageEvents()
        } else {
            records.value = await eventManager.getUpcomingHomepageEvents(props.limit)
        }
    }
})

</script>