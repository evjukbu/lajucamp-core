export const useSettingsManager = () => {
    const pb = usePocketBase()
    const currentUser = pb.authStore.model.id

    const SettingsManager = {
        getValue: async (key) => {
            let response
            try {
                response = await pb.collection('user_settings').getFirstListItem("user='" + currentUser + "' && setting='" + key + "'")
            } catch (e) {
                return false
            }
            if (response.content !== undefined && response.content !== null && response.content !== '') {
                return response.content
            } else {
                return true
            }
        },
        setValue: async (key, value) => {
            let exists = true
            let res = null
            let response
            try {
                response = await pb.collection('user_settings').getFirstListItem("user='" + currentUser + "' && setting='" + key + "'")
            } catch (e) {
                exists = false
            }
            console.log(exists)
            if (exists) {
                res = await pb.collection('user_settings').update(response.id, { content: value })
            } else {
                res = await pb.collection('user_settings').create({ user: currentUser, setting: key, content: JSON.stringify(value) })
            }
            return res
        },
        setValueOfOtherUser: async (user, key, value) => {
            let exists = true
            let res = null
            let response
            try {
                response = await pb.collection('user_settings').getFirstListItem("user='" + user + "' && setting='" + key + "'")
            } catch (e) {
                exists = false
            }
            console.log(exists)
            if (exists) {
                res = await pb.collection('user_settings').update(response.id, { content: value })
            } else {
                res = await pb.collection('user_settings').create({ user: user, setting: key, content: JSON.stringify(value) })
            }
            return res
        }

    }

    return SettingsManager
}