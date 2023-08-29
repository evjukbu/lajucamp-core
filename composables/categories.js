import { useLocalStorage } from "@vueuse/core"

export const useCategoryManager = () => {
    const pb = usePocketBase()
    async function getInternalCategoryList() {
        const response = await pb.collection('categories').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    async function getCategoryList() {
        const storage = useLocalStorage("categoryStore", { updated: null, items: [] })
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 10)) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            const data = await getInternalCategoryList()
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
    const CategoryManager = {
        getList: async () => {
            return (await getCategoryList()).items

        },
        update: async () => {
            await getEventList()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return CategoryManager


}