<template>
    <CardLikeContainer>
        <h1 class="text-3xl pb-3">Anzeigeeinstellungen</h1>
        <div class="form-control" v-for="(themeOption, index) in theme.themeOptions" :key="index">
            <label class="label cursor-pointer">
                <span class="label-text">{{ themeOption.name }}</span>
                <input type="radio" :name="themeOption.name" class="radio" :checked="selected === themeOption.name"
                    @change="selected = themeOption.name" />
            </label>
        </div>
        <div class="flex justify-end py-4 space-x-2">
            <div class="btn btn-primary" @click="apply()">Anwenden</div>
        </div>
    </CardLikeContainer>
</template>

<script setup>
const theme = useTheme()


const cookie = useCookie("theme", { expires: new Date('9999-12-31') })
const selected = ref(theme.getCurrentTheme())

onMounted(async () => {
    selected.value = theme.themeOptions.find(themeOption => themeOption.internal === theme.getCurrentTheme()).name
})

function apply() {
    theme.setTheme(theme.themeOptions.find(theme => theme.name === selected.value).internal)
}
</script>