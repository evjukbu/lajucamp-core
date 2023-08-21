<template>
  <a v-if="target.startsWith('http')" :href="target">
    <slot />
  </a>
  <RouterLink v-else :to="target">
    <slot />
  </RouterLink>
</template>

<script setup>
const props = defineProps(["target"])
</script>
