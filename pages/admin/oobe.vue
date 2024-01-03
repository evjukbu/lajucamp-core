<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="bg-base-100 w-11/12 h-5/6 flex flex-col justify-between shadow-lg rounded-md">
            <div class="h-5/6 flex">
                <div class="hero" v-show="step === 0">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="h-4"></div>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Willkommen beim
                                    </span><br /><span class="inline-grid"><span
                                            class="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
                                            aria-hidden="true" data-text="component library"></span><span
                                            class="pb-3 relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&amp;::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">Landesjugendcamp</span></span><span
                                        class="contrast-150">.</span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Lass uns deinen Account einrichten.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 1">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="flex flex-row justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        class="w-48 h-48 fill-red-500">
                                        <path fill-rule="evenodd"
                                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                            clip-rule="evenodd" />
                                    </svg>


                                </div>
                                <div class="h-4"></div>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Legen wir ein neues Passwort fest.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Das Passwort sollte mindestens 8<br />
                                    Zeichen
                                    lang sein und ein Sonderzeichen und eine Zahl enthalten.</p>
                                <div>
                                    <div class="label">
                                        <span class="label-text">Neues Passwort</span>
                                    </div>
                                    <input type="password" class="input input-lg input-bordered w-full" v-model="password"
                                        @change="errormessage = ''" />
                                    <div class="label">
                                        <span class="label-text">Neues Passwort wiederholen</span>
                                    </div>
                                    <input type="password" class="input input-lg input-bordered w-full"
                                        v-model="passwordRepeat" @change="errormessage = ''" />
                                    <div role="alert" class="alert alert-error mt-5" v-show="errormessage !== ''">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>

                                        <span>{{ errormessage }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="hero" v-show="step === 2">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="h-4"></div>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Du hast eine besondere Aufgabe.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Dafür bist du mit diesen Berechtigungen
                                    ausgestattet:
                                </p>
                                <div class="flex flex-col space-y-3 pt-3">
                                    <div v-for="permission in getPermissions()" class="flex flex-row space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                        </svg>
                                        <span>{{ permission }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 3">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="h-4"></div>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Schön, <span
                                            class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">dich</span>
                                        an Board
                                        zu haben.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Hier sind einge Tipps für den Einstieg.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 4">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="flex flex-row justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        class="w-48 h-48 fill-accent">
                                        <path fill-rule="evenodd"
                                            d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>

                                <div class="h-4"></div>
                                <span class="font-light text-gray-500">Tipp Nr. 1:</span>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Speichere dein Passwort<br />in einem Passwortmanager.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">So kann es dir nicht verloren
                                    gehen.<br />Und
                                    ganz nebenbei ist es auch noch sicherer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 5">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="flex flex-row justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        class="w-48 h-48 fill-orange-500">
                                        <path
                                            d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                        <path fill-rule="evenodd"
                                            d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                            clip-rule="evenodd" />
                                    </svg>


                                </div>

                                <div class="h-4"></div>
                                <span class="font-light text-gray-500">Tipp Nr. 2:</span>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Mache dich ein wenig<br />mit dem Programm vertraut,<br />eh du zu Arbeiten
                                        beginnst.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Klicke dich durch die Menüs und schaue
                                    dir<br />
                                    die
                                    verschiedenen Funktionen an. So kannst du dich besser zurecht finden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 6">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div class="flex flex-row justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        class="w-48 h-48 fill-primary">
                                        <path fill-rule="evenodd"
                                            d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>

                                <div class="h-4"></div>
                                <span class="font-light text-gray-500">Tipp Nr. 3:</span>
                                <h1
                                    class="font-title text-center text-[clamp(2rem,6vw,2.5rem)] font-black leading-[1.1] w-[115%] text-start">
                                    <span class="contrast-150">
                                        Verwende einen Computer<br />oder ein Tablet.
                                    </span>
                                </h1>
                                <p class="py-4 font-light md:text-lg xl:text-2xl">Die Seite ist für die Verwendung<br />auf
                                    einem
                                    Computer oder Tablet optimiert.<br />Auf einem Smartphone kann es zu Problemen kommen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero" v-show="step === 7">
                    <div class="hero-content flex-col lg:flex-row">
                        <div>
                            <div>
                                <div>
                                    <div class="h-4"></div>
                                    <h1
                                        class="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] w-[115%] text-start">
                                        <span class="contrast-150">
                                            Du bist bereit
                                        </span><br /><span
                                            class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">zu
                                            starten</span>.
                                    </h1>
                                    <p class="py-4 font-light md:text-lg xl:text-2xl">Wir freuen uns auf ein großartiges
                                        Camp mit dir!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-5">
                <div v-if="step !== 7"
                    class="inline-flex w-full flex-col items-stretch justify-right gap-2 px-4 md:flex-row xl:justify-end xl:px-0">
                    <div v-if="!submitting" @click="nextStep()" class="btn btn-neutral md:btn-lg md:btn-wide group px-12">
                        <span>Weiter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor"
                            class="mt-0.5 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                    <div v-else disabled class="btn btn-neutral md:btn-lg md:btn-wide group px-12">
                        <span class="loading loading-spinner"></span>
                        <span>Laden...</span>
                    </div>
                </div>
                <div v-else
                    class="inline-flex w-full flex-col items-stretch justify-right gap-2 px-4 md:flex-row xl:justify-end xl:px-0">
                    <div v-if="!submitting" @click="complete()"
                        class="btn btn-neutral md:btn-lg md:btn-wide group px-12 hover:btn-primary">
                        <span>Fertig</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="mt-0.5 w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1">
                            <path
                                d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
                        </svg>

                    </div>
                    <div v-else disabled class="btn btn-neutral md:btn-lg md:btn-wide group px-12 hover:btn-primary">
                        <span class="loading loading-spinner"></span>
                        <span>Laden...</span>
                    </div>
                </div>

            </div>
            <progress class="progress progress-accent w-full rounded-none rounded-b-md" :value="step - 1"
                max="6"></progress>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: "auth",
    layout: "blank",
});

const step = ref(0)
const settings = useSettingsManager();
const pb = usePocketBase()
const errormessage = ref("")
const submitting = ref(false)
const route = useRoute()

// Passwort
const password = ref("")
const passwordRepeat = ref("")

async function nextStep() {
    submitting.value = true

    let profile_updated
    let password_is_set
    /*
        0: Welcome
        1: Set password
        3: Tips
        4: Done
    */
    if (step.value === 0) {
        password_is_set = await settings.getValue("oobe_password_set")
        if (password_is_set.success) {
            step.value = 2
        } else {
            step.value = 1
        }
    } else if (step.value === 1) {
        // Validate input
        // Check if passwords match
        if (password.value !== passwordRepeat.value) {
            errormessage.value = "Die Passwörter stimmen nicht überein."
            return
        }
        // Check if password is long enough
        if (password.value.length < 8) {
            errormessage.value = "Das Passwort muss mindestens 8 Zeichen lang sein."
            return
        }
        // Check if password contains special characters
        if (!password.value.match(/[^a-zA-Z0-9]/)) {
            errormessage.value = "Das Passwort muss mindestens ein Sonderzeichen enthalten."
            return
        }
        // Check if password contains numbers
        if (!password.value.match(/[0-9]/)) {
            errormessage.value = "Das Passwort muss mindestens eine Zahl enthalten."
            return
        }

        // Set password
        const response = await pb.collection("users").update(pb.authStore.model.id, {
            password: password.value,
            passwordConfirm: passwordRepeat.value
        })

        // reauthenticate
        await pb.collection('users').authWithPassword(pb.authStore.model.email, password.value)

        // Save step in settings
        await settings.setValue("oobe_password_set", { success: true })

        // Go to next step
        step.value = 2
    } else {
        step.value++
    }

    submitting.value = false
}

function getPermissions() {
    let result = []
    if (pb.authStore.model.manageAllEvents) {
        result.push("Alle Veranstaltungen verwalten")
    } else {
        result.push("Veranstaltungen des Sprengels verwalten")
    }
    if (pb.authStore.model.manageCategories) {
        result.push("Alle Kategorien verwalten")
    }
    if (pb.authStore.model.manageLocations) {
        result.push("Alle Orte verwalten")
    }
    if (pb.authStore.model.manageSongs) {
        result.push("Liederbuch bearbeiten")
    }
    if (pb.authStore.model.manageWelcome) {
        result.push("Willkommensnachrichten verwalten")
    }
    if (pb.authStore.model.managePosts) {
        result.push("Nachrichtenposts verwalten")
    }
    if (pb.authStore.model.manageTeams) {
        result.push("Alle Sprengel verwalten")
    }
    if (pb.authStore.model.superadmin) {
        result.push("Alle Benutzer verwalten")
    }
    return result
}

async function complete() {
    submitting.value = true
    // Save step in settings
    await settings.setValue("oobe_complete", { success: true })
    if (route.query.redirect !== undefined) {
        await navigateTo(route.query.redirect)
    } else {
        await navigateTo("/admin");
    }
}
</script>