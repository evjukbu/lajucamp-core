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
    </div>
</template>

<script setup>
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })
const eventManager = useEventManager()
const config = useRuntimeConfig()
const events = ref(null)

onMounted(async () => {
    events.value = await eventManager.getDayList()
    console.log(events.value)
});
</script>