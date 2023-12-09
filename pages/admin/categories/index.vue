<template>
  <AdminLayoutHeader
    title="Kategorien verwalten"
    subtitle="Hier kannst du alle Kategorien bearbeiten."
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Kategorien', path: '/admin/events', active: true },
    ]"
  >
    <button class="btn btn-primary" @click="openCreateDialog()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
        />
      </svg>
      Neue Kategorie
    </button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box w-11/12 max-w-7xl">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="closeDialog()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
        <h3 v-if="action === 0" class="font-bold text-lg">Kategorie erstellen</h3>
        <h3 v-if="action === 1" class="font-bold text-lg">Kategorie bearbeiten</h3>
        <div class="py-4">
          <div class="label">
            <span class="label-text">Name der Kategorie</span>
          </div>
          <input
            type="text"
            v-model="name"
            placeholder="Beispieltitel"
            class="input input-bordered w-full"
            :disabled="submitting"
          />

          <div class="label">
            <span class="label-text">Beschreibung</span>
          </div>
          <input
            type="text"
            v-model="description"
            placeholder="kreatives, nachdenkliches, musikalisches, sportliches"
            class="input input-bordered w-full"
            :disabled="submitting"
          />
        </div>
        <div class="modal-action">
          <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
            Abbrechen
          </button>
          <button
            @click="save()"
            :disabled="submitting || name === null"
            class="btn btn-primary"
          >
            <div v-if="submitting">
              <span v-if="submitting" class="loading loading-spinner loading-xs"></span>
              Übertragen...
            </div>
            <div v-else>Speichern</div>
          </button>
        </div>
      </div>
    </dialog>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="closeDeleteDialog()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
        <h3 class="font-bold text-lg">Diese Kategorie wirklich löschen?</h3>
        <div class="py-4">
          <div v-if="error" role="alert" class="alert alert-error mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>

            <div>
              Die Kategorie konnte nicht gelöscht werden. Stelle sicher, dass keine
              Veranstaltung auf diese Kategorie verweist und versuche es erneut.
              <DevOnly>
                <span class="mt-4">{{ errorMessage }} </span>
              </DevOnly>
            </div>
          </div>
          Dieser Vorgang kann nicht rückgängig gemacht werden. Es darf keine Veranstaltung
          existieren, die diese Kategorie verwendet.
        </div>
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
  </AdminLayoutHeader>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <AdminHighPermissionWarning
        reason="Du bist berechtigt, alle Kategorien zu bearbeiten. Dabei kannst du bestehende
          Veranstaltungen zerstören."
      />
      <AdminCategoryList :data="data" @edit="edit" @delete="deleteDialog" />
    </div>
  </div>
</template>
<script setup>
import { isNullOrUndefined } from "util";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const pb = usePocketBase();
const data = ref(null);
const submitting = ref(false);
const error = ref(false);
const errorMessage = ref("");
// 0: Create, 1: Edit
let action = ref(-1);

// Data
const name = ref(null);
const description = ref(null);
let selectedId = 0;
// helper functions
function reset() {
  name.value = null;
  description.value = null;
  action.value = -1;
}
async function getAllCategories() {
  let payload = {
    sort: "name",
  };
  data.value = await pb.collection("categories").getFullList(payload);
}

await getAllCategories();

function openCreateDialog() {
  action.value = 0;
  my_modal_1.showModal();
}

function closeDialog() {
  reset();
  my_modal_1.close();
}

function assembleCategory() {
  return {
    name: name.value,
    description: description.value,
  };
}

function edit(category) {
  selectedId = category.id;
  name.value = category.name;
  description.value = category.description;
  action.value = 1;
  my_modal_1.showModal();
}

async function save() {
  if (action.value === 0) {
    await saveNew();
  }
  if (action.value === 1) {
    await saveEdited();
  }
  reset();
}

async function saveEdited() {
  submitting.value = true;
  const updated = await pb
    .collection("categories")
    .update(selectedId, assembleCategory());
  await getAllCategories();
  submitting.value = false;
  closeDialog();
}

async function saveNew() {
  submitting.value = true;
  const created = await pb.collection("categories").create(assembleCategory());
  await getAllCategories();
  submitting.value = false;
  closeDialog();
}

function deleteDialog(index) {
  error.value = false;
  my_modal_2.showModal();
  selectedId = data.value[index].id;
}

function closeDeleteDialog() {
  my_modal_2.close();
  selectedId = -1;
}

async function confirmDelete() {
  submitting.value = true;
  try {
    await pb.collection("categories").delete(selectedId);
  } catch (e) {
    errorMessage.value = e;
    error.value = true;
  }
  if (!error.value) {
    await getAllCategories();
    closeDeleteDialog();
  }
  submitting.value = false;
}
</script>
