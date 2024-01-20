import { useLocalStorage } from "@vueuse/core"

export const useCategoryManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("categoryStore", { updated: null, items: [] })

    async function getInternalCategoryList() {
        const response = await pb.collection('categories').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalCategoryList()
        storage.value = data
        return data
    }

    async function getCategoryList() {
        let shouldUpdate = false
        if (await shouldUpdateCache(storage, 'categories')) {
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
    const CategoryManager = {
        getList: async () => {
            return (await getCategoryList()).items
        },
        getById: async (id) => {
            return (await getCategoryList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }

    }

    return CategoryManager


}