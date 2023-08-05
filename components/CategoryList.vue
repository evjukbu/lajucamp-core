<template>
    <div v-if="categories != null">
        <CategoryListEntry v-for="category in categories" :key="category.id" :category="category" />
    </div>
    <div v-else>
        <CategoryListEntrySkeleton v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
const pb = usePocketBase();

const categories = ref(null);

onMounted(async () => {
  categories.value = await pb.collection('categories').getFullList();
});
</script>