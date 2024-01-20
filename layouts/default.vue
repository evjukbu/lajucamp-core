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

    if(await shouldUpdateCache(categoryStore, 'categories')) {
        await categoryManager.getList()
    }
    if(await shouldUpdateCache(eventStore, 'events')) {
        await eventManager.getList()
    }
    if(await shouldUpdateCache(pageStore, 'pages')) {
        await pageManager.getList()
    }
    if(await shouldUpdateCache(welcomeMessageStore, 'welcome_messages')) {
        await welcomeManager.getList()
    }
    if(await shouldUpdateCache(postStore, 'posts')) {
        await PostManager.getList()
    }
</script>
