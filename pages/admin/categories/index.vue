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
          Dieser Vorgang kann nicht rückgängig gemacht werden. Bestehende Veranstaltungen
          können beschädigt werden.
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
      <div
        v-if="pb.authStore.model.manageCategories"
        role="alert"
        class="alert alert-warning mb-3"
      >
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
            d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
          />
        </svg>

        <span
          >Du bist berrechtigt, alle Kategorien zu bearbeiten. Dabei kannst du bestehende
          Veranstaltungen zerstören. Wir gehen davon aus, dass der Administrator dir die
          Regeln erklärt hat. Normalerweise läuft es auf zwei Regeln hinaus:<br />
          <ol>
            <li>#1) Denke nach, bevor du tippst.</li>
            <li>#2) Mit großer Macht kommt große Verantwortung.</li>
          </ol>
        </span>
        <p></p>
      </div>
      <table v-if="data !== null && data.length > 0" class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in data" :key="index">
            <td>
              <div class="flex items-center gap-3">
                <div>
                  <div
                    v-if="category.name !== '' && category.name !== ' '"
                    class="font-bold"
                  >
                    {{ category.name }}
                  </div>
                  <div v-else>N/A</div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex items-center gap-3">
                <div>
                  <div v-if="category.name !== '' && category.name !== ' '">
                    {{ category.description }}
                  </div>
                  <div v-else class="flex flex-row space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="font-light">Diese Kategorie ist ungültig.</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="flex flex-row space-x-1">
              <button
                @click="edit(category)"
                class="group btn btn-sm btn-square btn-ghost hover:bg-cyan-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 group-hover:stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                @click="deleteDialog(index)"
                class="group btn btn-sm btn-square btn-ghost hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 group-hover:stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th />
          </tr>
        </tfoot>
      </table>
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
  my_modal_2.showModal();
  selectedId = data.value[index].id;
}

function closeDeleteDialog() {
  my_modal_2.close();
  selectedId = -1;
}

async function confirmDelete() {
  submitting.value = true;
  await pb.collection("categories").delete(selectedId);
  await getAllCategories();
  closeDeleteDialog();
  submitting.value = false;
}
</script>
