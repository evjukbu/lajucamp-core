<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3"> {{ categoryName }}</h1>
        <span>{{ categoryDescription }}</span>
        <FilteredEventList :items="records" />
    </CardLikeContainer>
</template>

<script setup>
import FilteredEventList from '../../components/FilteredEventList.vue';

const route = useRoute()
const eventManager = useEventManager()
const categoryManager = useCategoryManager()

const categoryName = ref("Kategorie")
const categoryDescription = ref("")
const records = ref(null);

onMounted(async () => {
    records.value = await eventManager.getByCategory(route.params.id)
    let category = await categoryManager.getById(route.params.id)
    categoryName.value = category.name
    categoryDescription.value = category.description
});

</script>