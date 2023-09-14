import { useLocalStorage } from "@vueuse/core"

export const usePictureManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("pictureStore", { updated: null, items: [] })

    async function getInternalPictureList() {
        const response = await pb.collection('images').getFullList({

        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalPictureList()
        storage.value = data
        return data
    }

    async function getPictureList() {
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 120)) {
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
    const PictureManager = {
        getList: async () => {
            return (await getPictureList()).items
        },
        getById: async (id) => {
            return (await getPictureList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return PictureManager


}