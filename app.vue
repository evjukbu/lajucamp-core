<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const theme = useTheme()

if (theme.isDark()) {
  useHead({
    meta: [
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
      }
    ]
  })
} else {
  useHead({
    meta: [
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      }
    ]
  })
}
</script>