export const shouldUpdateCache = (storage, minutes) => {
    const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

    function hackyCookieWorkaround() {
        const currentType = typeof cookie.value
        if (currentType === "string") {
            return JSON.parse(cookie.value)
        } else {
            return cookie.value
        }
    }

    function checkBypassCache() {
        if (cookie.value === undefined) return false
        const data = hackyCookieWorkaround()
        return data.some(obj => obj.bypassCache === true)
    }
    console.log("checkBypassCache", checkBypassCache())
    if (checkBypassCache()) return true

    if (storage.value.updated !== null) {
        if (((new Date()) - (new Date(storage.value.updated))) > minutes * 60 * 1000 && navigator.onLine) {
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