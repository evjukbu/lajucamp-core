<template>
    <router-link :to="'/music/' + props.item.id" class="flex items-center py-1 space-x-3">
        <div class="flex flex-col text-sm font-bold">
            <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <span>{{ props.item.number}}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <h1 class="text-lg font-bold">{{ props.item.name }}</h1>
            <div class="flex gap-2">
                <span class="font-light text-sm">{{ props.item.author }}</span>
            </div>
        </div>
    </router-link>
</template>
  
<script setup>
const props = defineProps(["item"])
</script>
