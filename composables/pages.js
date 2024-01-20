import { useLocalStorage } from "@vueuse/core"

export const usePageManager = () => {
    const pb = usePocketBase()

    const storage = useLocalStorage("pageStore", { updated: null, items: [] })

    async function getInternalPageList() {
        const response = await pb.collection('pages').getFullList({
            sort: 'order'
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalPageList()
        storage.value = data
        return data
    }

    async function getPageList() {
        let shouldUpdate = false
        if (await shouldUpdateCache(storage, 'pages')) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            return await update()
        } else {
            if (storage.value.updated !== null) {
                return storage.value
            } else {
                throw "User is offline and no data is downloaded"
            }
        }
    }
    const PageManager = {
        getList: async () => {
            return (await getPageList()).items
        },
        getById: async (id) => {
            return (await getPageList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return PageManager


}