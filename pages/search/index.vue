<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Suchen</h1>
        <input v-model="query" @input="search()" type="text" placeholder="Suchbegriff eingeben"
            class="input input-bordered w-full" /><br />
        <div class="pb-3" v-if="query !== ''">
            <div v-if="events !== null && events.length > 0 && !config.public.disableEvents">
                <span class="text-sm font-light">Veranstaltungen</span>
                <EventListEntry v-for="event in events" :key="event.id" :item="event" :locations="locationList"
                    :categories="categoryList" />
            </div>
            <div v-if="categories !== null && categories.length > 0 && !config.public.disableEvents">
                <span class="text-sm font-light">Kategorien</span>
                <CategoryListEntry v-for="category in categories" :key="category.id" :category="category" />
            </div>
            <div v-if="allowMusic && songs !== null && songs.length > 0">
                <span class="text-sm font-light">Lieder</span>
                <MusicListEntry v-for="song in songs" :item="song" :key="song.id" />
            </div>
        </div>
        <div v-else class="flex items-center h-screen">
            <span class="mx-auto text-sm font-light">Tippen, um zu suchen</span>
        </div>
    </CardLikeContainer>
</template>

<script setup>
const query = ref("")
const pb = usePocketBase()
const events = ref(null)
const categories = ref(null)
const songs = ref(null)
const locationList = ref({})
const categoryList = ref({})
const allowMusic = ref(false)
const config = useRuntimeConfig()

const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

function hackyCookieWorkaround() {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}

function checkMusicAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowMusic === true)
}

onMounted(async () => {
    allowMusic.value = checkMusicAccess()
})

async function search() {
    if (query === "" || query === null) {
        events.value = null
        categories.value = null
        locations.value = null
        songs.value = null
    } else {
        console.log("Searching")
        events.value = await pb.collection('events').getFullList({
            sort: 'name',
            filter: "name~'" + query.value + "' || description~'" + query.value + "'",
            expand: 'location,category'
        });

        categories.value = await pb.collection('categories').getFullList({
            sort: 'name',
            filter: "name~'" + query.value + "' || description~'" + query.value + "'"
        });
        if (allowMusic.value) {
            songs.value = await pb.collection('songs').getFullList({
                sort: 'name',
                filter: "name~'" + query.value + "' || author~'" + query.value + "'"
            });
        }

    }

}
</script>
