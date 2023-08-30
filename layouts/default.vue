<template>
    <LayoutThemeHelper>
        <LayoutTopbar class="sticky top-0 z-50" />
        <main :data-theme="theme.getCurrentTheme()" class="content px-3 bg-background relative pb-16">
            <slot />
        </main>
        <LayoutBottomNavigation />
    </LayoutThemeHelper>
</template>

<script setup>
const theme = useTheme()
</script>
