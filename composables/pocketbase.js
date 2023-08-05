import PocketBase from 'pocketbase';


export const usePocketBase = () => {
    const config = useRuntimeConfig();
    return new PocketBase(config.public.pocketbaseUrl);
}