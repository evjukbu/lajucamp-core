<template>
    <div class="flex flex-col space-y-3 pb-3">
        <div class="card card-compact bg-base-100 shadow-lg">
            <div class="card-body">
                <h2 class="card-title">Router</h2>
                <div class="card-content">
                    {{ $route }}
                </div>
            </div>
        </div>
        <div class="card card-compact bg-base-100 shadow-lg">
            <div class="card-body">
                <h2 class="card-title">Access Keys</h2>
                <div class="card-content">
                    {{ cookie }}
                </div>
            </div>
        </div>
        <div class="card card-compact bg-base-100 shadow-lg">
            <div class="card-body">
                <h2 class="card-title">Runtime Config</h2>
                <div class="card-content">
                    {{ config }}
                </div>
            </div>
        </div>
        <div class="card card-compact bg-base-100 shadow-lg">
            <div class="card-body">
                <h2 class="card-title">EventManager</h2>
                <div class="card-content">
                    {{ events }}
                </div>
            </div>
        </div>
        <div class="card card-compact">
            <Swiper class="w-full h-24">
                <SwiperSlide v-for="(slide, idx) in slides" :key="idx">
                    Slide me!<br />{{ idx }}
                </SwiperSlide>

                <!-- useSwiper() within a swiper instance -->
                <SwiperControls />
            </Swiper>
        </div>
    </div>
</template>

<script setup>
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })
const eventManager = useEventManager()
const config = useRuntimeConfig()
const events = ref(null)
const slides = ref(Array.from({ length: 10 }, () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    // Figure out contrast color for font
    const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'

    return { bg: `rgb(${r}, ${g}, ${b})`, color: contrast }
}))
onMounted(async () => {
    events.value = await eventManager.getDayList()
    console.log(events.value)
});
</script>
