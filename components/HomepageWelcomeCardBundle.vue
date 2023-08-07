<template>
    <div class="flex flex-col space-y-3" v-if="result !== null && result.length > 0">
        <HomepageWelcomeCard v-for="entry in result" v-show="entry.enabled" :title="entry.title" :text="entry.text" :target="entry.target"/>
    </div>
</template>

<script setup>
const pb = usePocketBase()
const result = ref(null)

result.value = await pb.collection('welcome_messages').getFullList({
    sort: '-created',
});

</script>