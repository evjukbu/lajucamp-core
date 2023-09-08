import { useLocalStorage } from "@vueuse/core"

export const useWelcomeManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("welcomeMessageStore", { updated: null, items: [] })


    async function getInternalMessageList() {
        const response = await pb.collection('welcome_messages').getFullList({
            sort: 'order'
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalMessageList()
        storage.value = data
        return data
    }
    async function getMessageList() {
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 60)) {
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
    const WelcomeManager = {
        getList: async () => {
            return (await getMessageList()).items
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return WelcomeManager
}