<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  meta: [
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    }
  ]
})
</script>