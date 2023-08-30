import { useLocalStorage } from "@vueuse/core"

export const usePostManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("postStore", { updated: null, items: [] })


    async function getInternalPostList() {
        const response = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        response.forEach((item) => {
            // Do the request once so that we have the images cached
            console.log("Fetching")
            fetch(pb.files.getUrl(item, item.image))
        })
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalPostList()
        storage.value = data
        return data
    }


    async function getPostList() {
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
    const PostManager = {
        getList: async (limit = -1) => {
            const data = (await getPostList()).items
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        update: async () => {
            return await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return PostManager
}