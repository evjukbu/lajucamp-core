<template>
  <AdminLayoutHeader title="Sprengelverwaltung" subtitle="Hier können Sprengel angelegt, bearbeitet und gelöscht werden."
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Sprengel', path: '/admin/teams', active: true },
    ]">
    <button class="btn btn-primary" @click="openCreateDialog()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
      Neuer Sprengel
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
      <h3 v-if="action === 0" class="font-bold text-lg">Sprengel erstellen</h3>
      <h3 v-if="action === 1" class="font-bold text-lg">
        Sprengel bearbeiten
      </h3>
      <div class="py-4">
        <div class="label">
          <span class="label-text">Name des Sprengels</span>
        </div>
        <input type="text" v-model="name" placeholder="Sprengel Beispielhausen" class="input input-bordered w-full"
          :disabled="submitting" />
        <div class="label">
          <span class="label-text">Webseite</span>
        </div>
        <input type="text" v-model="link" placeholder="https://ejh.de" class="input input-bordered w-full"
          :disabled="submitting" />
        <div class="label">
          <span class="label-text">Logo des Sprengels</span>
        </div>
        <input type="file" id="fileInput" accept="image/*" class="file-input file-input-bordered w-full" />
      </div>
      <div class="modal-action">
        <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
          Abbrechen
        </button>
        <button @click="save()" :disabled="submitting || name === null" class="btn btn-primary">
          <div v-if="submitting">
            <span v-if="submitting" class="loading loading-spinner loading-xs"></span>
            Übertragen...
          </div>
          <div v-else>Speichern</div>
        </button>
      </div>
    </div>
  </dialog>
  <dialog id="delete_modal" class="modal">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDeleteDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <h3 class="font-bold text-lg">Diesen Sprengel wirklich löschen?</h3>
      <div v-if="error" role="alert" class="alert alert-error mb-3 mt-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>

        <div>
          Der Sprengel konnte nicht gelöscht werden. Stelle sicher, dass
          keine Nutzer und keine Veranstaltungen existieren, die diesem Sprengel zugeordnet sind und versuche es erneut.
          <DevOnly>
            <span class="mt-4"><br />Fehler: {{ errorMessage }} </span>
          </DevOnly>
        </div>
      </div>
      <div class="py-4">Dieser Vorgang kann nicht rückgängig gemacht werden.</div>
      <div class="modal-action">
        <button class="btn pr-3" @click="closeDeleteDialog()">Abbrechen</button>
        <button :disabled="submitting" class="btn btn-error" @click="confirmDelete()">
          <div v-if="submitting">
            <span class="loading loading-spinner loading-xs"></span>
            Übertragen...
          </div>
          <div v-else>Löschen</div>
        </button>
      </div>
    </div>
  </dialog>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <AdminHighPermissionWarning reason="Du bist berechtigt, alle Sprengel zu bearbeiten. Dabei kannst du bestehende
          Veranstaltungen zerstören." />
      <AdminTeamList :data="data" @delete="deleteDialog" @edit="edit" />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const pb = usePocketBase();
const data = ref(null);
const submitting = ref(false);
const error = ref(false);
const errorMessage = ref("");

let formData = new FormData();
const name = ref(null);
const link = ref(null);
let selectedId = 0;

// 0: Create, 1: Edit
let action = ref(-1);

async function getAllTeams() {
  let payload = {
    sort: "name",
  };
  data.value = await pb.collection("teams").getFullList(payload);
}

await getAllTeams();

function reset() {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = "";
  name.value = null;
  link.value = null;
  formData = new FormData();
  action.value = -1;
  submitting.value = false;
  error.value = false;
  errorMessage.value = "";
}

function openCreateDialog() {
  reset();
  action.value = 0;
  create_modal.showModal();
}

function closeDialog() {
  reset();
  create_modal.close();
}

onMounted(() => {
  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function () {
    for (let file of fileInput.files) {
      formData.set("logo", file);
    }
  });
});

async function save() {
  if (action.value === 0) {
    await saveNew();
  }
  if (action.value === 1) {
    await saveEdited();
  }
  closeDialog();
}

function assembleTeam() {
  formData.set("name", name.value);
  formData.set("link", link.value);
}

async function saveNew() {
  submitting.value = true;
  assembleTeam();
  const result = await pb.collection("teams").create(formData);
  await getAllTeams();
  submitting.value = false;
  closeDialog();
  return result;
}

function deleteDialog(team) {
  error.value = false;
  errorMessage.value = "";
  delete_modal.showModal();
  selectedId = team.id
}

function closeDeleteDialog() {
  submitting.value = false;
  delete_modal.close();
}

async function confirmDelete() {
  submitting.value = true;
  try {
    await pb.collection("teams").delete(selectedId);
    await getAllTeams();
  } catch (e) {
    error.value = true;
    errorMessage.value = e.message;
  } finally {
    submitting.value = false;
    if (!error.value) {
      closeDeleteDialog();
    }
  }
}

function edit(team) {
  selectedId = team.id;
  name.value = team.name;
  link.value = team.link;
  action.value = 1;
  create_modal.showModal();
}

async function saveEdited() {
  submitting.value = true;
  assembleTeam();
  const updated = await pb.collection("teams").update(selectedId, formData);
  console.log(formData)
  await getAllTeams();
  submitting.value = false;
  closeDialog();
}
</script>