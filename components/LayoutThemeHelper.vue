<template>
    <div class="h-screen" :data-theme="theme.getCurrentTheme()">
        <slot />
    </div>
</template>

<script setup>
const theme = useTheme()
</script>