import { useLocalStorage } from "@vueuse/core"

export const useCategoryManager = () => {
    const pb = usePocketBase()
    async function getInternalCategoryList() {
        const response = await pb.collection('categories').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    const CategoryManager = {
        update: async () => {
            await getEventList()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return CategoryManager


}