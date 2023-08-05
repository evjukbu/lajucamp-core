<template>
    <router-link :to="props.to" v-if="!props.to.startsWith('http')">
        <li>
        <a>
            <slot />
            {{ props.name }}
        </a>
    </li>
    </router-link>
    <li v-else>
        <a :href="props.to">
            <slot />
            {{ props.name }}
        </a></li>
    

</template>

<script setup>
const props = defineProps(['name', 'to'])
</script>