import { useOnline } from "@vueuse/core"

export const shouldUpdateCache = async (storage, remote) => {
    const cookie = useCookie("keys", { expires: new Date('9999-12-31') })
    const online = useOnline()
    const pb = usePocketBase()
    console.log(storage.value)

    if(online.value === false) {
        console.debug("User is offline, not updating cache")
        return false
    }
    if(storage.value.updated === null || storage.value === null) {
        console.debug("Cache is empty, updating cache")
        return true
    }

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

    console.debug("Bypassing cache", checkBypassCache())
    if (checkBypassCache()) return true

    let remote_updated_date = null
    let local_updated_date = null

    if(remote !== null) {
        const res = await pb.collection(remote).getList(1, 1, {
            sort: "-updated",
        })
            remote_updated_date = new Date(res.items[0].updated)
            console.debug("Last remote update on " + remote, remote_updated_date)
            local_updated_date = new Date(storage.value.updated)
            console.debug("Last local update on " + remote, local_updated_date)
            if(remote_updated_date > local_updated_date) {
                console.debug("Remote is newer, updating cache")
                return true
            } else {
                console.debug("Local is newer, not updating cache")
                return false
            }
        
    } else {
        alert("Inproper use of shouldUpdateCache, remote is null")
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