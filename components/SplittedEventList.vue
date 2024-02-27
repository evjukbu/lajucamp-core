<template>
    <div class="flex justify-center">
        <div role="tablist" class="tabs tabs-boxed w-min">
            <div v-for="(item, index) in records" :class="'tab' + ((activeTab === index) ? ' tab-active' : '')" role="tab"
                :value="index" @click="setTab(index)">{{ item.day
                }}</div>
        </div>
    </div>
    <div v-show="!loading">
        <div v-if="records != null">
            <div class="card card-compact h-full" v-if="records.length > 0">
                <Swiper @swiper="initSwiper" class="w-full" @slideChange="onSwipe" :autoplay="{ delay: 4 }">
                    <SwiperSlide v-for="(item, index) in records" :key="index" :item="item" class="h-full">
                        <div class="collapse collapse-plus">
                            <input type="checkbox" />
                            <div class="collapse-title text-base font-light">
                                Vergangene Veranstaltungen
                            </div>
                            <div class="collapse-content">
                                <EventListEntry v-for="event in item.events.past" :key="event.id" :item="event" />
                            </div>
                        </div>
                        <EventListEntry v-if="item.events.scheduled.length > 0" v-for="event in item.events.scheduled"
                            :key="event.id" :item="event" />
                        <div class="flex flex-col justify-start" v-else>
                            <div class="max-w-md text-center">
                                <h1 class="text-xl">Das war's für heute!</h1>
                                <p class="pt-3">
                                    Wechsle zu einem anderen Tag oder blende vergangene Veranstaltungen ein.
                                </p>
                            </div>
                            <!-- TODO: This is horrible. Can't we have it fill the rest of the viewport?-->
                            <div class="h-96" />
                            <div class="h-64" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div v-else>
                <span class="text-sm font-light text-center">Keine Veranstaltungen verfügbar.</span>
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
const today = new Date().toLocaleDateString('de-DE', { weekday: 'short' });
const activeTab = ref(0)
const swiper = ref(null)
onMounted(async () => {
    recordsSkipPast.value = await eventManager.getDayList(true)
    records.value = await eventManager.getDayList()
    loading.value = false

})

function setTab(index) {
    activeTab.value = index
    console.log(swiper.value)
    swiper.value.slideTo(index, 200, false)
}

function onSwipe(details) {
    activeTab.value = details.activeIndex
}

function initSwiper(sw) {
    swiper.value = sw
}
</script>