<template>
    <AdminLayoutHeader title="Mein Konto"
        subtitle="Hier kannst du deine Daten sowie die Einstellungen deines Kontos verwalten." :path="[
            { name: 'Home', path: '/admin', active: false },
            { name: 'Mein Konto', path: '/admin/user', active: true },
        ]">
        <!-- Action Buttons here -->
    </AdminLayoutHeader>
    <div class="pl-3">
        <div class="overflow-x-auto flex flex-col space-y-3">
            <div class="flex flex-col ">
                <div class="flex flex-row justify-center">
                    <div class="avatar placeholder left-0 -left-3">
                        <div class="w-48 rounded-full" v-if="!reloadFix">
                            <img v-if="pb.authStore.model.avatar !== ''"
                                :src="pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar)" />
                            <img v-else :src="'https://api.dicebear.com/7.x/initials/svg?seed=' +
                                pb.authStore.model.name
                                " />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-center">
                <span class="font-bold text-4xl pb-4 pt-5">Willkommen, {{ pb.authStore.model.name }}!</span>
            </div>
            <div class="alert alert-info" v-if="resetMailSent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

                Eine Email zum Zurücksetzen deines Passworts wurde an deine Emailadresse gesendet.
            </div>
            <div class="alert alert-info" v-if="changeMailSent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

                Eine Bestätigungsemail wurde an deine neue Emailadresse gesendet.
            </div>
            <div>
                <span class="text-2xl">
                    Persönliche Informationen
                </span>
                <div class="label">
                    <span class="label-text">Benutzername</span>
                </div>
                <input type="text" class="input input-bordered w-full" disabled :value="pb.authStore.model.username" />
                <div class="label">
                    <span class="label-text">Email</span>
                </div>
                <input type="text" :class="'input input-bordered w-full ' + (isValidEmail(mail) ? '' : 'input-error')"
                    v-model="mail" />
                <div class="label">
                    <span class="label-text">Voller Name</span>
                </div>
                <input type="text" class="input input-bordered w-full" v-model="name" />
                <div class="label">
                    <span class="label-text">Profilbild</span>
                </div>
                <input type="file" id="fileInput" accept="image/*" class="file-input file-input-bordered w-full" />
                <br />
                <span class="text-xl mt-5">
                    Danger Zone
                </span>
                <div
                    class="flex flex-row justify-between space-y-3 mt-3 p-3 border-solid border-2 border-red-500 rounded-lg border-text">
                    <div>
                        <span class="font-bold text-red-500">Passwort ändern</span><br />
                        Bedenke, dass dein Account Inhalte bearbeiten und erstellen kann, die für alle Teilnehmenenden
                        sichtbar
                        sind. Bitte gehe verantwortungsvoll mit deinem Account um und verwende ein sicheres Passwort, dass
                        du am
                        besten in einem Passwortmanager speicherst.
                    </div>

                    <div class="btn btn-warning w-2/12" @click="resetPasswort">Passwort zurücksetzen</div>
                </div>
            </div>
            <div class="flex flex-col space-y-3">
                <span class="text-2xl">
                    Sprengel und Berechtigungen
                </span>
                <div>
                    Du bist angemeldet für <span class="font-bold">{{ team.name }}</span>. Folgende Berechtigungen
                    besitzt
                    du:
                    <div class="flex flex-col space-y-3 pt-3">
                        <div v-for="permission in getPermissions()" class="flex flex-row space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                            <span>{{ permission }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row justify-end">
                <div class="btn btn-primary w-1/12" @click="save">Speichern</div>
            </div>
            <div class="flex flex-row justify-end" v-show="invalidMail && !isValidEmail(mail)">
                <span class="text-red-500">Bitte überprüfe die makierten Felder.</span>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    middleware: "auth",
    layout: "admin",
});

const pb = usePocketBase();

const resetMailSent = ref(false)
const changeMailSent = ref(false)
const invalidMail = ref(false)
const team = ref(null)
const mail = ref(pb.authStore.model.email)
const name = ref(pb.authStore.model.name)

const reloadFix = ref(false)

let formData = new FormData();

team.value = await pb.collection("teams").getOne(pb.authStore.model.team)

async function refresh() {
    formData = new FormData();
    team.value = await pb.collection("teams").getOne(pb.authStore.model.team)
    reloadFix.value = true
    reloadFix.value = false
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

async function resetPasswort() {
    await pb.collection('users').requestPasswordReset(pb.authStore.model.email);
    resetMailSent.value = true
}

function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

async function save() {
    if (!isValidEmail(mail.value)) {
        invalidMail.value = true
        return
    }
    if (pb.authStore.model.email !== mail.value) {
        await pb.collection('users').requestEmailChange(mail.value);
        changeMailSent.value = true
    }
    if (name.value !== pb.authStore.model.name) {
        formData.set("name", name.value);
    }
    if (formData.has("avatar") || formData.has("name")) {
        await pb.collection("users").update(pb.authStore.model.id, formData);
        refresh()
    }
}

onMounted(() => {
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", function () {
        for (let file of fileInput.files) {
            formData.set("avatar", file);
        }
    });
});
</script>
