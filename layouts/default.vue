<template>
    <LayoutThemeHelper>
        <LayoutTopbar class="sticky top-0 z-50" />
        <main :data-theme="cookie" class="content px-3 bg-background relative pb-16">
            <slot />
        </main>
        <LayoutBottomNavigation />
    </LayoutThemeHelper>
</template>

<script setup>
const cookie = useCookie("theme", { expires: new Date('9999-12-31') })

function getCurrentThemeName() {
    if (cookie.value === undefined) return "fantasy"
    return cookie.value
}

onMounted(async () => {
    cookie.value = getCurrentThemeName()
})
</script>
