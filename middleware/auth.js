export default defineNuxtRouteMiddleware(async (to, from) => {
    const pb = usePocketBase()
    if (pb.authStore.isValid === false) {
        console.log(to)
        return navigateTo({
            path: "/admin/login",
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        const settings = useSettingsManager()
        const oobe = await settings.getValue('oobe_complete')
        if (!oobe) {
            if (to.path !== '/admin/oobe') {
                return navigateTo({
                    path: "/admin/oobe",
                    query: {
                        redirect: to.fullPath
                    }
                })
            }
        }
    }


})