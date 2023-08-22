<template>
    <router-link :to="'/events/' + props.item.id" class="flex items-center py-1 space-x-2">
        <div class="flex flex-col text-sm font-bold">
            <EventListEntryDateContainer :record="props.item" />
        </div>
        <div class="flex flex-col">
            <h1 class="text-lg font-bold">{{ props.item.name }}</h1>
            <div class="flex gap-2">
                <div class="badge badge-info gap-2 badge-outline">
                    {{ props.item.expand.location.name }}
                </div>
                <div class="badge badge-accent gap-2 badge-outline">
                    {{ props.item.expand.category.name }}
                </div>
            </div>
        </div>
    </router-link>
</template>
  
<script setup>
const props = defineProps(["item"])
</script>
  
<style scoped>
.event-chip {
    margin: 0.1rem;
}
</style>
