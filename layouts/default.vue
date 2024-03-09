<template>
    <LayoutThemeHelper class="min-h-full">
        <LayoutTopbar class="sticky top-0 z-50" />
        <main :data-theme="theme.getCurrentTheme()" class="content px-3 bg-background relative pb-16">
            <slot />
        </main>
        <LayoutBottomNavigation :class="assembleNavbarClass()" />
    </LayoutThemeHelper>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core"

const theme = useTheme()
console.debug("Populating cache")
const categoryStore = useLocalStorage("categoryStore", { updated: null, items: [] })
const eventStore = useLocalStorage("eventStore", { updated: null, items: [] })
const pageStore = useLocalStorage("pageStore", { updated: null, items: [] })
const welcomeMessageStore = useLocalStorage("welcomeMessageStore", { updated: null, items: [] })
const postStore = useLocalStorage("postStore", { updated: null, items: [] })

const categoryManager = useCategoryManager()
const eventManager = useEventManager()
const pageManager = usePageManager()
const welcomeManager = useWelcomeManager()
const PostManager = usePostManager()

const device = useDevice()

if (await shouldUpdateCache(categoryStore, 'categories')) {
    await categoryManager.getList()
}
if (await shouldUpdateCache(eventStore, 'events')) {
    await eventManager.getList()
}
if (await shouldUpdateCache(pageStore, 'pages')) {
    await pageManager.getList()
}
if (await shouldUpdateCache(welcomeMessageStore, 'welcome_messages')) {
    await welcomeManager.getList()
}
if (await shouldUpdateCache(postStore, 'posts')) {
    await PostManager.getList()
}

function shouldShiftNavbar() { 
    return device.isIos && device.userAgent.includes("hasHomeButton=false");
}

function assembleNavbarClass() {
    if (shouldShiftNavbar()) {
        return "z-10 mb-4"
    } else {
        return "z-10"
    }
}
</script>
