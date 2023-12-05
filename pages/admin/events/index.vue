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
        <h3 class="font-bold text-lg">Neue Veranstaltung</h3>
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
            class="h-48 min-h-48 pt-3"
            theme="snow"
            toolbar="full"
            contentType="html"
            v-model:content="description"
            :enable="!submitting"
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
            @click="saveNew()"
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
  </AdminLayoutHeader>
  <div class="pl-3">
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Kategorie</th>
            <th>Ort</th>
            <th>Start</th>
            <th>Ende</th>
            <th />
          </tr>
        </thead>
        <tbody v-if="data !== null">
          <tr v-for="event in data">
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
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(event.start))
              }}
            </td>
            <td>
              {{
                new Intl.DateTimeFormat("de", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(event.end))
              }}
            </td>
            <td class="flex flex-row space-x-1">
              <div class="group btn btn-square btn-ghost hover:bg-blue-400">
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
              </div>
              <div class="group btn btn-square btn-ghost hover:bg-red-400">
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
              </div>
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
            <th />
          </tr>
        </tfoot>
      </table>
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
data.value = await pb.collection("events").getFullList({
  sort: "start",
  filter: 'team="' + pb.authStore.model.team + '"',
  expand: "location,category",
});
const categories = await pb.collection("categories").getFullList({
  sort: "name",
});
const locations = await pb.collection("locations").getFullList({
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
const description = ref(null);
const show_homepage = ref(true);
const team = pb.authStore.model.team;
const submitting = ref(false);

function reset() {
  name.value = null;
  category.value = null;
  location.value = null;
  start.value = null;
  end.value = null;
  description.value = null;
  show_homepage.value = true;
}

function assembleEvent() {
  return {
    name: name.value,
    category: category.value,
    location: location.value,
    start: start.value,
    end: end.value,
    description: description.value,
    homepage_ignore: !show_homepage.value,
    team: team,
  };
}
function openCreateDialog() {
  my_modal_1.showModal();
}

function closeDialog() {
  reset();
  my_modal_1.close();
}

async function saveNew() {
  submitting.value = true;
  const created = await pb.collection("events").create(assembleEvent());
  submitting.value = false;
  const record = await pb.collection("events").getOne(created.id, {
    expand: "location,category",
  });
  data.value.push(record);
  closeDialog();
  return record;
}
</script>
