<template>
    <div class="flex flex-col space-y-3" v-if="result !== null && result.length > 0">
        <HomepageWelcomeCard v-for="entry in result" v-show="entry.enabled" :title="entry.title" :text="entry.text"
            :target="entry.target" />
    </div>
</template>

<script setup>
const messageManager = useWelcomeManager()
const result = ref(null)

result.value = await messageManager.getList()

</script>