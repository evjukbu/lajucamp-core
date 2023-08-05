<template>
    <router-link :to="'/location/' + props.location.id" class="flex items-center py-1">
        <div class="flex flex-col">
            <h1 class="text-lg font-bold">{{ props.location.name }}</h1>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps(['location'])
</script>