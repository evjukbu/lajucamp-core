<template>
  <LayoutThemeHelper>
    <main :data-theme="theme.getCurrentTheme()" class="content px-3 bg-base-300 relative pb-16">
      <slot />
    </main>
  </LayoutThemeHelper>
</template>

<script setup>
const theme = useTheme();
</script>
