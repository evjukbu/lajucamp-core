export const shouldUpdateCache = (storage, minutes) => {
    if (storage.value.updated !== null) {
        if (((new Date()) > (new Date(storage.value.updated))) > minutes * 60 * 1000 && navigator.onLine) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

export const updateAllCaches = async () => {
    const categoryManager = useCategoryManager()
    const eventManager = useEventManager()
    const pageManager = usePageManager()
    const welcomeManager = useWelcomeManager()
    const PostManager = usePostManager()
    await categoryManager.update()
    await eventManager.update()
    await pageManager.update()
    await welcomeManager.update()
    await PostManager.update()
}