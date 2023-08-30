import { useLocalStorage } from "@vueuse/core"

export const useWelcomeManager = () => {
    const pb = usePocketBase()
    async function getInternalMessageList() {
        const response = await pb.collection('welcome_messages').getFullList({
            sort: 'order'
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function getMessageList() {
        const storage = useLocalStorage("welcomeMessageStore", { updated: null, items: [] })
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 120)) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            const data = await getInternalMessageList()
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
    const WelcomeManager = {
        getList: async () => {
            return (await getMessageList()).items
        },
        update: async () => {
            await getMessageList()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return WelcomeManager
}