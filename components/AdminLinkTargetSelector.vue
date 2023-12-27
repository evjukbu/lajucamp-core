<template>
    <div v-if="ready" class="flex flex-row">
        <div class="flex flex-col pr-8">
            <div class="form-control" @change="setModel">
                <label class="label cursor-pointer">
                    <span>Kein Link</span>
                    <input type="radio" class="radio ml-3" @change="selected = 0" :checked="selected === 0" />
                </label>
                <label class="label cursor-pointer">
                    <span>Veranstaltung</span>
                    <input type="radio" class="radio ml-3" @change="selected = 1" :checked="selected === 1" />
                </label>
                <label class="label cursor-pointer">
                    <span>Nachrichtenbeitrag</span>
                    <input type="radio" class="radio ml-3" @change="selected = 2" :checked="selected === 2" />
                </label>
                <label class="label cursor-pointer">
                    <span>Interne Seite</span>
                    <input type="radio" class="radio ml-3" @change="selected = 3" :checked="selected === 3" />
                </label>
                <label class="label cursor-pointer">
                    <span>Externer Link</span>
                    <input type="radio" class="radio ml-3" @change="selected = 4" :checked="selected === 4" />
                </label>
            </div>
        </div>
        <div class="flex flex-col ">
            <div v-show="selected === 1">
                <div class="label">
                    <span class="label-text">Zu verlinkende Veranstaltung</span>
                </div>
                <select v-model="selectedEvent" class="select select-bordered w-full" @change="setModel">
                    <option selected disabled>Bitte auswählen</option>
                    <option :value="event.id" v-for="event in events">{{ event.name }} | {{ new Intl.DateTimeFormat("de",
                        { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "numeric" }).format(new
                            Date(event.start)) }}</option>
                </select>
            </div>
            <div v-show="selected === 2">
                <div class="label">
                    <span class="label-text">Zu verlinkender Post</span>
                </div>
                <select v-model="selectedPost" class="select select-bordered w-full" @change="setModel">
                    <option selected disabled>Bitte auswählen</option>
                    <option :value="post.id" v-for="post in posts">{{ post.title }} | {{ new Intl.DateTimeFormat("de",
                        { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "numeric" }).format(new
                            Date(post.created)) }}</option>
                </select>
            </div>
            <div v-show="selected === 3">
                <div class="label">
                    <span class="label-text">Zu verlinkende Seite</span>
                </div>
                <select v-model="selectedPage" class="select select-bordered w-full" @change="setModel">
                    <option selected disabled>Bitte auswählen</option>
                    <option :value="page.id" v-for="page in pages">{{ page.name }}</option>
                </select>
            </div>
            <div v-show="selected === 4">
                <AdminHighPermissionWarning
                    reason="Bitte stelle sicher, dass die verlinkte Seite vertrauenswürdig ist und prüfe die verlinkten Inhalte.">
                </AdminHighPermissionWarning>
                <div class="label">
                    <span class="label-text">Zu verlinkende URL</span>
                </div>
                <input v-model="url" class="input input-bordered w-full" @change="setModel" />
            </div>
        </div>
    </div>
    <div v-else class="flex flex-row space-x-5">
        <div class="flex flex-col space-y-3 w-1/6">
            <div class="skeleton h-8 w-full"></div>
            <div class="skeleton h-8 w-full"></div>
            <div class="skeleton h-8 w-full"></div>
            <div class="skeleton h-8 w-full"></div>
            <div class="skeleton h-8 w-full"></div>
        </div>
        <div class="flex flex-col space-y-3 w-5/6">
            <div class="flex flex-col gap-4 w-full">
                <div class="skeleton h-32 w-full"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const pb = usePocketBase()
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const selected = ref(0)
const ready = ref(false)

function getTargetType() {
    if (props.modelValue === "" || props.modelValue === null || props.modelValue === undefined) {
        return 0
    } else if (props.modelValue.startsWith(" /events")) { return 1 } else if (props.modelValue.startsWith("/posts")) {
        return 2
    } else if (props.modelValue.startsWith("/misc/page-")) { return 3 } else { return 4 }
}

async function getTarget() {
    const type = getTargetType()
    selected.value = type
    if (type === 1) {
        selectedEvent.value = props.modelValue.split("/")[2]
    } else if (type === 2) {
        selectedPost.value = props.modelValue.split("/")[2]
    } else if (type === 3) {
        selectedPage.value = props.modelValue.split("-")[2]
    } else if (type === 4) {
        url.value = props.modelValue
    }
}
onMounted(async () => {
    getTarget()
    await getData()

})

async function getAllEvents() {
    return pb.collection("events").getFullList({ sort: "name" })
}

async function getAllPosts() {
    return pb.collection("posts").getFullList({ sort: "created" })
}

async function getAllPages() {
    return pb.collection("pages").getFullList({ sort: "order" })
}

async function getData() {
    events.value = await getAllEvents()
    posts.value = await getAllPosts()
    pages.value = await getAllPages()
    ready.value = true
}

const events = ref(null)
const selectedEvent = ref(null)
const posts = ref(null)
const selectedPost = ref(null)
const pages = ref(null)
const selectedPage = ref(null)
const url = ref(null)


function debug() {
    console.log(selected.value)
    console.log(selectedPost.value)
}

function setModel() {
    if (selected.value === 0) {
        emits('update:modelValue', null)
        selectedEvent.value = null
        selectedPost.value = null
        selectedPage.value = null
        url.value = null
    } else if (selected.value === 1) {
        if (selectedEvent.value === null) {
            emits('update:modelValue', null)
        } else {
            emits('update:modelValue', " /events/" + selectedEvent.value)
        }
        selectedPost.value = null
        selectedPage.value = null
        url.value = null
    } else if (selected.value === 2) {
        if (selectedPost.value === null) {
            emits('update:modelValue', null)
        } else {
            emits('update:modelValue', "/posts/" + selectedPost.value)
        }
        selectedEvent.value = null
        selectedPage.value = null
        url.value = null
    } else if (selected.value === 3) {
        if (selectedPage.value === null) {
            emits('update:modelValue', null)
        } else {
            emits('update:modelValue', "/misc/page-" + selectedPage.value)
        }
        selectedEvent.value = null
        selectedPost.value = null
        url.value = null
    } else if (selected.value === 4) {
        emits('update:modelValue', url.value)
        selectedEvent.value = null
        selectedPost.value = null
        selectedPage.value = null
    }
}
</script>
