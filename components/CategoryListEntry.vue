<template>
    <router-link :to="'/category/' + props.category.id" class="flex items-center py-1">
        <div class="flex flex-col">
            <h1 class="text-lg font-bold">{{ props.category.name }}</h1>
            <div class="flex gap-2 overflow-hidden text-ellipsis text-sm font-light">
                {{ props.category.description }}
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps(['category'])
</script>