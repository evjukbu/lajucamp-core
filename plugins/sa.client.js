import SimpleAnalytics from "simple-analytics-vue";
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    nuxtApp.vueApp.use(SimpleAnalytics, {
        domain: config.public.saDomain,
    });
});