import { useLocalStorage } from "@vueuse/core"

export const useTeamManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("teamStore", { updated: null, items: [] })

    async function getInternalTeamList() {
        const response = await pb.collection('teams').getFullList();
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalTeamList()
        storage.value = data
        return data
    }

    async function getTeamList() {
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
    const TeamManager = {
        getList: async () => {
            return (await getTeamList()).items
        },
        getById: async (id) => {
            return (await getTeamList()).items.find(obj => obj.id === id)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return TeamManager


}