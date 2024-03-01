<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Changelog</h1>
        <div v-for="entry in changelog">
            <span><b>{{ entry.date }}</b></span>
            <ul class="list-disc list-inside">
                <li v-for="change in entry.changes">{{ change }}</li>
            </ul>
        </div>
    </CardLikeContainer>
</template>

<script setup>
const changelog = useChangelog();
</script>