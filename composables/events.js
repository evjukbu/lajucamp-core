import { useLocalStorage } from "@vueuse/core"

export const useEventManager = () => {
    const pb = usePocketBase()
    async function getInternalEventList() {
        const response = await pb.collection('events').getFullList({
            expand: "location,category",
            sort: "start"
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function getEventList() {
        const storage = useLocalStorage("eventStore", { updated: null, items: [] })
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 5)) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            const data = await getInternalEventList()
            storage.value = data
            return data
        } else {
            if (storage.value.updated !== null) {
                return storage.value
            } else {
                throw "User is offline and no data is downloaded"
            }
        }
    }

    const EventManager = {
        getList: async (limit = -1) => {
            const data = (await getEventList()).items
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getById: async (id) => {
            const data = (await getEventList()).items.find(obj => obj.id === id)
            return data
        },
        getUpcomingEvents: async (limit = -1) => {
            const data = (await getEventList()).items.filter(obj => (new Date(obj.end)).getTime() > (new Date()).getTime())
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getUpcomingHomepageEvents: async (limit = -1) => {
            const data = (await getEventList()).items.filter(obj => ((new Date(obj.end)).getTime() > (new Date()).getTime() && !obj.homepage_ignore))
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getByCategory: async (id) => {
            const data = (await getEventList()).items.filter(obj => obj.category == id)
            return data
        },
        update: async () => {
            await getEventList()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return EventManager
}