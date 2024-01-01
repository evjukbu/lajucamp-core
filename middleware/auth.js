export default defineNuxtRouteMiddleware((to, from) => {
    const pb = usePocketBase()
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (pb.authStore.isValid === false) {
        console.log(to)
        return navigateTo({
            path: "/admin/login",
            query: {
                redirect: to.fullPath
            }
        })
    }
})