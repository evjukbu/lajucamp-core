<template>
    <div class="h-screen" :data-theme="cookie">
        <slot />
    </div>
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