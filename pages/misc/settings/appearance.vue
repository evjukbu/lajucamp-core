<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Anzeigeeinstellungen</h1>
        <div class="form-control" v-for="(theme, index) in themes" :key="index">
            <label class="label cursor-pointer">
                <span class="label-text">{{ theme.name }}</span>
                <input type="radio" :name="theme.name" class="radio" :checked="selected === theme.name"
                    @change="selected = theme.name" />
            </label>
        </div>
        <div class="flex justify-end py-4 space-x-2">
            <div class="btn btn-primary" @click="apply()">Anwenden</div>
        </div>
    </CardLikeContainer>
</template>

<script setup>

const themes = [
    { name: 'Festival Dunkel - Preview', internal: "bulabu" },
    { name: 'Fantasy - Standard', internal: "fantasy" },
    { name: 'Sonnig', internal: "light" },
    { name: 'Pastel', internal: "pastel" },
    { name: 'Dunkel - Nacht', internal: "dark" },
    { name: 'Dunkel - Wald', internal: "forest" },
]

const cookie = useCookie("theme", { expires: new Date('9999-12-31') })
const selected = ref(getCurrentThemeName())

function getCurrentThemeName() {
    if (cookie.value === undefined) return "fantasy"
    return cookie.value
}

onMounted(async () => {
    selected.value = themes.find(theme => theme.internal === getCurrentThemeName()).name
})

function apply() {
    cookie.value = themes.find(theme => theme.name === selected.value).internal
}
</script>