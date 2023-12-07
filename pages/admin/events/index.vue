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
                  <option
                    v-for="team in teams"
                    :key="team.id"
                    :value="team.id"
                  >
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
      <div v-if="pb.authStore.model.manageAllEvents" role="alert" class="alert alert-warning mb-3">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>

          <span>Du bist berrechtigt, Veranstaltungen aller Sprengel zu bearbeiten. Wir gehen davon aus, dass der Administrator dir die
  Regeln erklärt hat. Normalerweise läuft es auf zwei Regeln hinaus:<br />
          <ol>
            <li>#1) Denke nach, bevor du tippst.</li>
            <li>#2) Mit großer Macht kommt große Verantwortung.</li>
          </ol>
        </span>
        <p>
        
      </p>
      </div>
      <table v-if="data !== null && data.length > 0" class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Kategorie</th>
            <th>Ort</th>
            <th>Start</th>
            <th>Ende</th>
            <th v-if="pb.authStore.model.manageAllEvents">Sprengel</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in data" :key="index">
            <td>
              <div class="flex items-center gap-3">
                <div>
                  <div class="font-bold">{{ event.name }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="badge badge-md badge-info gap-2 badge-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clip-rule="evenodd"
                  />
                </svg>

                {{ event.expand.category.name }}
              </div>
            </td>
            <td>
              <div class="badge badge-md badge-accent gap-2 badge-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>

                {{ event.expand.location.name }}
              </div>
            </td>
            <td>
              {{
                new Intl.DateTimeFormat("de", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(event.start))
              }}
            </td>
            <td>
              {{
                new Intl.DateTimeFormat("de", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(event.end))
              }}
            </td>
            <td>
              <div v-if="event.team !== null && pb.authStore.model.manageAllEvents">
                <TeamNote :team="event.team" />
              </div>
            </td>
            <td class="flex flex-row space-x-1">
              <button
                @click="edit(event)"
                class="group btn btn-square btn-ghost hover:bg-cyan-600"
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
                class="group btn btn-square btn-ghost hover:bg-red-600"
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
        <!-- foot {{ formatter.format(new Date(event.start)) }}-->
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Kategorie</th>
            <th>Ort</th>
            <th>Start</th>
            <th>Ende</th>
            <th v-if="pb.authStore.model.manageAllEvents">Sprengel</th>
            <th />
          </tr>
        </tfoot>
      </table>
      <div v-if="data.length === 0">
        <div class="hero">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-2xl">Keine Daten verfügbar.</h1>
              <p class="py-6">
                Derzeit existieren keine Veranstaltungen, für die du Zugriffsrechte
                besitzt. Überprüfe, ob du dem richtigen Sprengel zugeordnet bist oder lege
                eine neue Veranstaltung an.
              </p>
            </div>
          </div>
        </div>
      </div>
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
await getAllEvents()
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
const team = ref(null)
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
  }
  if (!pb.authStore.model.manageAllEvents) {
    payload.filter = 'team="' + pb.authStore.model.team + '"'
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
  team.value = null
}

function assembleEvent() {
  let userTeam = null
  if (pb.authStore.model.manageAllEvents) {
    userTeam = team.value
  } else {
    userTeam = pb.authStore.model.team
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
    team.value = event.team
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
  await getAllEvents()
  submitting.value = false;
  closeDialog();
  return record;
}

async function saveEdited() {
  submitting.value = true;
  const updated = await pb.collection("events").update(selectedId, assembleEvent());
  await getAllEvents()
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
  await getAllEvents()
  closeDeleteDialog();
  submitting.value = false;
}
</script>
