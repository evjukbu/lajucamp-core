<template>
    <router-link :to="props.target" v-if="!props.target.startsWith('http')">
        <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ props.title}}</h2>
            <p>{{ props.text}}</p>
        </div>
    </div>
    </router-link>
    <a :href="props.target" v-else>
        <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ props.title}}</h2>
            <p>{{ props.text}}</p>
        </div>
    </div>
    </a>
    
</template>

<script setup>
const props = defineProps(["title", "text", "target"])
</script>