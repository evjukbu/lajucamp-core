<template>
    <AdminLayoutHeader title="Benutzerverwaltung" subtitle="Hier können alle Benutzer verwaltet werden." :path="[
        { name: 'Home', path: '/admin', active: false },
        { name: 'Benutzer', path: '/admin/users', active: true },
    ]">
        <button class="btn btn-primary" @click="openCreateDialog()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path
                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Neuer Benutzer
        </button>
    </AdminLayoutHeader>
    <dialog id="create_modal" class="modal">
        <div class="modal-box w-11/12 max-w-7xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDialog()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
            <h3 v-if="action === 0" class="font-bold text-lg">Benutzer anlegen</h3>
            <h3 v-if="action === 1" class="font-bold text-lg">
                Benutzer bearbeiten
            </h3>
            <div class="py-4">
                <div class="alert alert-error" role="alert" v-if="error">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {{ errorMessage }}
                </div>
                <div class="flex flex-row space-x-3 justify-between">
                    <div class="w-full">
                        <div class="label">
                            <span class="label-text">Benutzername</span>
                        </div>
                        <input type="text" v-model="username" placeholder="max.lueneburg"
                            class="input input-bordered w-full" :disabled="submitting" />
                        <div class="label">
                            <span class="label-text">Vor- und Nachname</span>
                        </div>
                        <input type="text" v-model="name" placeholder="Max Mustermann" class="input input-bordered w-full"
                            :disabled="submitting" />
                        <div class="label">
                            <span class="label-text">E-Mail Addresse</span>
                        </div>
                        <input type="text" v-model="mail" @change="error = false" placeholder="max.mustermann@evlka.de"
                            class="input input-bordered w-full" :disabled="submitting" />
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Sprengel</span>
                            </div>
                            <select v-model="team" class="select select-bordered" :disabled="submitting">
                                <option value="0" disabled selected>Bitte wählen</option>
                                <option v-for="team in teams" :key="team.id" :value="team.id">
                                    {{ team.name }}
                                </option>
                            </select>
                        </label>

                        <div v-if="action === 0">
                            <div class="label">
                                <span class="label-text">Methode zur Passwortvergabe</span>
                            </div>

                            <label class="label cursor-pointer">
                                <span class="label-text">Sende einen Link zum Setzen des Passwortes per Email</span>
                                <input type="radio" name="radio-10" class="radio" @change="passwordMode = 0"
                                    :checked="passwordMode === 0" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text">Passwort anzeigen und dem Benutzer mitteilen</span>
                                <input type="radio" name="radio-10" class="radio" @change="passwordMode = 1"
                                    :checked="passwordMode === 1" />
                            </label>
                        </div>
                        <div v-else>
                            s
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="label">
                            <span class="label-text">Berechtigungen</span>
                        </div>
                        <label class="label cursor-pointer">
                            <span class="label-text">Alle Veranstaltungen verwalten</span>
                            <input type="checkbox" v-model="manageAllEvents" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Alle Kategorien verwalten</span>
                            <input type="checkbox" v-model="manageCategories" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Alle Orte verwalten</span>
                            <input type="checkbox" v-model="manageLocations" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Liederbuch bearbeiten</span>
                            <input type="checkbox" v-model="manageSongs" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Willkommensnachrichten verwalten</span>
                            <input type="checkbox" v-model="manageWelcome" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Nachrichtenposts verwalten</span>
                            <input type="checkbox" v-model="managePosts" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Alle Sprengel verwalten</span>
                            <input type="checkbox" v-model="manageTeams" class="checkbox" />
                        </label>
                        <label class="label cursor-pointer">
                            <span class="label-text">Alle Benutzer verwalten</span>
                            <input type="checkbox" v-model="manageUsers" class="checkbox" />
                        </label>
                    </div>

                </div>


            </div>
            <div class="modal-action">
                <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
                    Abbrechen
                </button>
                <button @click="save()"
                    :disabled="submitting || name === null || username === null || mail === null || team === 0"
                    class="btn btn-primary">
                    <div v-if="submitting">
                        <span v-if="submitting" class="loading loading-spinner loading-xs"></span>
                        Übertragen...
                    </div>
                    <div v-else>Speichern</div>
                </button>
            </div>
        </div>
    </dialog>
    <dialog id="success_modal" class="modal">
        <div class="modal-box w-11/12 max-w-7xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeSuccessModal()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
            <h3 class="font-bold text-lg">Der Benutzer wurde angelegt.</h3>
            <div class="py-4">
                <span>Benutzername: <span class="font-bold">{{ displayed_username }}</span></span><br />
                <span>Passwort: <span class="font-bold">{{ displayed_password }}</span></span>

                <p>Teile diese Zugangsdaten dem neuen Benutzer mit. Das Passwort muss beim ersten Login geändert werden.</p>
            </div>
            <div class="modal-action">
                <button class="btn btn-neutral" @click="closeSuccessModal()">
                    OK
                </button>
            </div>
        </div>
    </dialog>
    <div class="pl-3">
        <div class="overflow-x-auto">
            <AdminUserList :data="data" @edit="edit" />
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    middleware: "auth",
    layout: "admin",
});

const pb = usePocketBase();
const settings = useSettingsManager()
const data = ref(null);
const submitting = ref(false);
const error = ref(false);
const errorMessage = ref("");
const advancedDialog = ref(false);

let selectedId = 0;

// 0: Create, 1: Edit
let action = ref(-1);

const username = ref(null);
const name = ref(null);
const mail = ref(null);
const team = ref(0);
const manageAllEvents = ref(false);
const manageCategories = ref(false);
const manageLocations = ref(false);
const manageSongs = ref(false);
const manageWelcome = ref(false);
const managePosts = ref(false);
const manageTeams = ref(false);
const manageUsers = ref(false);

// 0: Send reset mail, 1: Change password on first login
const passwordMode = ref(0)

const displayed_username = ref(null);
const displayed_password = ref(null);

function changePasswordMode(mode) {
    passwordMode.value = mode
}

async function getAllUsers() {
    let payload = {
        sort: "username",
    };
    data.value = await pb.collection("users").getFullList(payload);
}

const teams = await pb.collection("teams").getFullList({
    sort: "name",
});
await getAllUsers();

function reset() {
    username.value = null;
    name.value = null;
    mail.value = null;
    team.value = 0;
    manageAllEvents.value = false;
    manageCategories.value = false;
    manageLocations.value = false;
    manageSongs.value = false;
    manageWelcome.value = false;
    managePosts.value = false;
    manageTeams.value = false;
    manageUsers.value = false;
    action.value = -1;
    submitting.value = false;
    error.value = false;
    errorMessage.value = "";
    passwordMode.value = 0
}

function openCreateDialog() {
    action.value = 0;
    create_modal.showModal();
}

function closeDialog() {
    reset();
    create_modal.close();
}

function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

function assembleNewUser() {
    // This is a temporary password that the user will have to change
    const password = Math.random().toString(36).slice(-8);
    let result = {
        username: username.value,
        name: name.value,
        email: mail.value,
        team: team.value,
        manageAllEvents: manageAllEvents.value,
        manageCategories: manageCategories.value,
        manageLocations: manageLocations.value,
        manageSongs: manageSongs.value,
        manageWelcome: manageWelcome.value,
        managePosts: managePosts.value,
        manageTeams: manageTeams.value,
        manageUsers: manageUsers.value,
        superadmin: false,
        emailVisibility: false,
        password: password,
        passwordConfirm: password,
    };
    if (passwordMode.value === 1) {
        result.needs_password_change = true
    } else {
        result.needs_password_change = false
    }
    return result

}

async function createUser() {
    submitting.value = true;
    if (!isValidEmail(mail.value)) {
        errorMessage.value = "Die eingegbene E-Mail Adresse ist ungültig.";
        error.value = true;
        submitting.value = false;
        return;
    }
    const user = assembleNewUser();
    const record = await pb.collection('users').create(user);
    await pb.collection('users').requestVerification(user.email);
    if (passwordMode.value === 0) {
        await pb.collection('users').requestPasswordReset(user.email);
    } else if (passwordMode.value === 1) {
        await settings.setValueOfOtherUser(record.id, "oobe_init_password", user.password)
        displayed_username.value = user.username;
        displayed_password.value = user.password;
        success_modal.showModal()
    }
    closeDialog()
    await getAllUsers();
}

function closeSuccessModal() {
    success_modal.close()
}

function edit(user) {
    action.value = 1;
    selectedId = user.id;
    username.value = user.username;
    name.value = user.name;
    mail.value = user.email;
    team.value = user.team;
    manageAllEvents.value = user.manageAllEvents;
    manageCategories.value = user.manageCategories;
    manageLocations.value = user.manageLocations;
    manageSongs.value = user.manageSongs;
    manageWelcome.value = user.manageWelcome;
    managePosts.value = user.managePosts;
    manageTeams.value = user.manageTeams;
    manageUsers.value = user.manageUsers;
    create_modal.showModal();
}

function assembleEditedUser() {
    let result = {
        username: username.value,
        name: name.value,
        email: mail.value,
        team: team.value,
        manageAllEvents: manageAllEvents.value,
        manageCategories: manageCategories.value,
        manageLocations: manageLocations.value,
        manageSongs: manageSongs.value,
        manageWelcome: manageWelcome.value,
        managePosts: managePosts.value,
        manageTeams: manageTeams.value,
        manageUsers: manageUsers.value,
        superadmin: false,
        emailVisibility: false,
    };
    return result

}

async function saveEdited() {
    submitting.value = true;
    if (!isValidEmail(mail.value)) {
        errorMessage.value = "Die eingegbene E-Mail Adresse ist ungültig.";
        error.value = true;
        submitting.value = false;
        return;
    }
    const user = assembleEditedUser();
    await pb.collection('users').update(selectedId, user);
    closeDialog()
    await getAllUsers();
}

async function save() {
    if (action.value === 0) {
        await createUser();
    } else if (action.value === 1) {
        await saveEdited();
    }
}
</script>