<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-2xl">Keine Daten verfügbar.</h1>
        <p class="py-6">
          {{ props.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["message"]);
</script>
