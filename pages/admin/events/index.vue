<template>
  <AdminLayoutHeader
    title="Veranstaltungen verwalten"
    subtitle="Hier kannst du alle
  Veranstaltungen deines Sprengels verwalten."
    :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Veranstaltungen', path: '/admin/events', active: true },
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
      Neue Veranstaltung
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
        <h3 v-if="action === 0" class="font-bold text-lg">Neue Veranstaltung</h3>
        <h3 v-if="action === 1" class="font-bold text-lg">Veranstaltung bearbeiten</h3>
        <div class="py-4">
          <div class="label">
            <span class="label-text">Veranstaltungstitel</span>
          </div>
          <input
            type="text"
            placeholder="Beispieltitel"
            class="input input-bordered w-full"
            :disabled="submitting"
            v-model="name"
          />
          <div class="my-3" v-if="pb.authStore.model.manageAllEvents">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Sprengel</span>
              </div>
              <select
                v-model="team"
                class="select select-bordered"
                :disabled="submitting"
              >
                <option v-for="team in teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="flex flex-row space-x-3 my-3">
            <div class="w-full">
              <div class="label">
                <span class="label-text">Startzeitpunkt</span>
              </div>
              <VueDatePicker
                class="w-full"
                v-model="start"
                input-class-name="input input-bordered"
                menu-class-name="menu"
                :disabled="submitting"
              ></VueDatePicker>
            </div>
            <div class="w-full">
              <div class="label">
                <span class="label-text">Endzeitpunkt</span>
              </div>
              <VueDatePicker
                class="w-full"
                v-model="end"
                input-class-name="input input-bordered"
                menu-class-name="menu"
                :disabled="submitting"
              ></VueDatePicker>
            </div>
          </div>
          <div class="flex flex-row space-x-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Kategorie</span>
              </div>
              <select
                v-model="category"
                class="select select-bordered"
                :disabled="submitting"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Ort</span>
              </div>
              <select
                v-model="location"
                class="select select-bordered"
                :disabled="submitting"
              >
                <option
                  v-for="location in locations"
                  :key="location.id"
                  :value="location.id"
                >
                  {{ location.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="label">
            <span class="label-text">Beschreibung</span>
          </div>
          <quill-editor
            id="quill"
            class="h-48 min-h-48 pt-3"
            theme="snow"
            toolbar="full"
            contentType="html"
            v-model:content="description"
            :content="description"
            :enable="!submitting"
            v-if="modalIsOpen"
          ></quill-editor>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Auf der Startseite anzeigen:</span>
              <input
                type="checkbox"
                class="toggle"
                v-model="show_homepage"
                false-value="false"
                true-value="true"
                checked
                :disabled="submitting"
              />
            </label>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
            Abbrechen
          </button>
          <button
            class="btn btn-primary"
            :disabled="
              name === null ||
              start === null ||
              end === null ||
              location === null ||
              category === null ||
              submitting
            "
            @click="save()"
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
        <h3 class="font-bold text-lg">Diese Veranstaltung wirklich löschen?</h3>
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
  </AdminLayoutHeader>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <AdminHighPermissionWarning
        reason="Du bist berechtigt, Veranstaltungen aller Sprengel zu bearbeiten."
      />
      <AdminEventList :data="data" @delete="notImplemented" @edit="notImplemented" />
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
const pb = usePocketBase();
const data = ref(null);
await getAllEvents();
const categories = await pb.collection("categories").getFullList({
  sort: "name",
});
const locations = await pb.collection("locations").getFullList({
  sort: "name",
});

const teams = await pb.collection("teams").getFullList({
  sort: "name",
});

/*
const formatter = Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "numeric"
  hour: "numeric",
  minute: "numeric",
  timeZone: "Europe/Berlin",
});*/

const name = ref(null);
const category = ref(null);
const location = ref(null);
const start = ref(null);
const end = ref(null);
const description = ref("");
const show_homepage = ref(true);
const team = ref(null);
const submitting = ref(false);

// 0: Create, 1: Edit
let action = -1;
const modalIsOpen = ref(false);
let selectedId = -1;
let selectedIndex = -1;

async function getAllEvents() {
  let payload = {
    sort: "start",
    expand: "location,category,team",
  };
  if (!pb.authStore.model.manageAllEvents) {
    payload.filter = 'team="' + pb.authStore.model.team + '"';
  }
  data.value = await pb.collection("events").getFullList(payload);
}

function reset() {
  name.value = null;
  category.value = null;
  location.value = null;
  start.value = null;
  end.value = null;
  description.value = "";
  show_homepage.value = true;
  team.value = null;
}

function assembleEvent() {
  let userTeam = null;
  if (pb.authStore.model.manageAllEvents) {
    userTeam = team.value;
  } else {
    userTeam = pb.authStore.model.team;
  }
  return {
    name: name.value,
    category: category.value,
    location: location.value,
    start: start.value,
    end: end.value,
    description: description.value,
    homepage_ignore: !show_homepage.value,
    team: userTeam,
  };
}
function openCreateDialog() {
  action = 0;
  modalIsOpen.value = true;

  my_modal_1.showModal();
  console.log(description.value);
}

function edit(event) {
  name.value = event.name;
  category.value = event.category;
  location.value = event.location;
  start.value = event.start;
  end.value = event.end;
  description.value = event.description;
  show_homepage.value = !event.homepage_ignore;
  if (pb.authStore.model.manageAllEvents) {
    team.value = event.team;
  }
  selectedId = event.id;
  action = 1;
  modalIsOpen.value = true;
  my_modal_1.showModal();
}
function closeDialog() {
  reset();
  modalIsOpen.value = false;
  my_modal_1.close();
}
async function save() {
  if (action === 0) {
    await saveNew();
  }
  if (action === 1) {
    await saveEdited();
  }
}
async function saveNew() {
  submitting.value = true;
  const created = await pb.collection("events").create(assembleEvent());
  await getAllEvents();
  submitting.value = false;
  closeDialog();
  return record;
}

async function saveEdited() {
  submitting.value = true;
  const updated = await pb.collection("events").update(selectedId, assembleEvent());
  await getAllEvents();
  submitting.value = false;
  closeDialog();
}

function deleteDialog(index) {
  my_modal_2.showModal();
  selectedIndex = index;
  selectedId = data.value[index].id;
}

function closeDeleteDialog() {
  my_modal_2.close();
  selectedId = -1;
  selectedIndex = -1;
}

async function confirmDelete() {
  submitting.value = true;
  const record = await pb.collection("events").getOne(selectedId, {});
  console.log(record);
  await pb.collection("events").delete(record.id);
  await getAllEvents();
  closeDeleteDialog();
  submitting.value = false;
}

function notImplemented() {
  alert("Not implemented yet!")
}
</script>
