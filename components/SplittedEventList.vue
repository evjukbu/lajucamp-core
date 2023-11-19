<template>
    <div class="form-control">
        <label class="label cursor-pointer">
            <span class="label-text">Vergangene ausblenden</span>
            <input type="checkbox" class="toggle" v-model="skipPast" />
        </label>
    </div>
    <div v-show="!loading">
        <div v-if="skipPast">
            <div v-if="recordsSkipPast != null">
                <div v-if="recordsSkipPast.length > 0" class="pb-6" v-for="item in recordsSkipPast" :key="'skip' + item.id"
                    :item="item">
                    <span class="text-sm font-light">{{ item.day }}</span>
                    <EventListEntry v-for="event in item.events" :key="'skipEntry' + event.id" :item="event" />
                </div>
                <div v-else>
                    <span class="text-sm font-light text-center">Keine Veranstaltungen verfügbar.</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="records != null">
                <div v-if="records.length > 0" class="pb-6" v-for="item in records" :key="item.id" :item="item">
                    <span class="text-sm font-light">{{ item.day }}</span>
                    <EventListEntry v-for="event in item.events" :key="event.id" :item="event" />
                </div>
                <div v-else>
                    <span class="text-sm font-light text-center">Keine Veranstaltungen verfügbar.</span>
                </div>
            </div>
        </div>
    </div>
    <div v-show="loading">
        <EventListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const eventManager = useEventManager()
const records = ref(null)
const recordsSkipPast = ref(null)
const skipPast = ref(true)
const loading = ref(true)

onMounted(async () => {
    recordsSkipPast.value = await eventManager.getDayList(true)
    records.value = await eventManager.getDayList()
    loading.value = false
})

</script>