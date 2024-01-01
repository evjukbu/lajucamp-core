<template>
  <AdminLayoutHeader title="Nachrichten verwalten"
    subtitle="Mit Nachrichten kannst du Informationen schnell und einfach an alle Teilnehmenden weitergeben." :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Nachrichten', path: '/admin/posts', active: true },
    ]">
    <button class="btn btn-primary" @click="openCreateDialog()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
      Beitrag erstellen
    </button>
  </AdminLayoutHeader>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box w-11/12 max-w-7xl">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <h3 v-if="action === 0" class="font-bold text-lg">Beitrag erstellen</h3>
      <h3 v-if="action === 1" class="font-bold text-lg">Beitrag bearbeiten</h3>
      <div class="py-4">
        <div class="label">
          <span class="label-text">Titel des Beitrags</span>
        </div>
        <input type="text" v-model="title" placeholder="Beispieltitel" class="input input-bordered w-full"
          :disabled="submitting" />
        <div v-show="action === 0" class="label">
          <span class="label-text">Vorschaubild</span>
        </div>
        <input v-show="action === 0" type="file" id="fileInput" accept="image/*"
          class="file-input file-input-bordered w-full" />

        <div class="label">
          <span class="label-text">Beschreibung</span>
        </div>
        <textarea type="text" v-model="description" placeholder="Kurzbeschreibung"
          class="textarea textarea-bordered w-full" :disabled="submitting" />
        <div class="label">
          <span class="label-text">Beitragstext</span>
        </div>
        <quill-editor id="quill" class="h-48 min-h-48 pt-3" theme="snow" toolbar="full" contentType="html"
          v-model:content="content" :content="content" :enable="!submitting" v-if="modalIsOpen"></quill-editor>
      </div>
      <div class="modal-action">
        <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
          Abbrechen
        </button>
        <button @click="save()" :disabled="submitting ||
          title === null ||
          content === '' ||
          (action === 0 && !formData.has('image'))
          " class="btn btn-primary">
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
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDeleteDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <h3 class="font-bold text-lg">Diesen Beitrag wirklich löschen?</h3>
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
  <AdminPostList :data="data" @edit="edit" @delete="deleteDialog" />
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const pb = usePocketBase();
const data = ref(null);
const action = ref(-1);
let formData = null;

const title = ref(null);
const description = ref(null);
const content = ref("");
const modalIsOpen = ref(false);
const submitting = ref(false);

let selectedId = null;
let selectedIndex = null;

async function getAllPosts() {
  let payload = {
    sort: "-created",
  };
  data.value = await pb.collection("posts").getFullList(payload);
}

await getAllPosts();

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

function openCreateDialog() {
  formData = new FormData();
  action.value = 0;
  my_modal_1.showModal();
  modalIsOpen.value = true;
}

function assemblePost() {
  formData.set("title", title.value);
  formData.set("description", description.value);
  formData.set("text", content.value);
  formData.set("author", pb.authStore.model.name);
}

function assembleEditPost() {
  return {
    title: title.value,
    description: description.value,
    text: content.value,
  };
}

onMounted(() => {
  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function () {
    for (let file of fileInput.files) {
      formData.set("image", file);
    }
  });
});

function reset() {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = "";
  formData = null;
  title.value = null;
  description.value = null;
  content.value = "";
}

async function save() {
  if (action.value === 0) {
    await saveNew();
  }
  if (action.value === 1) {
    await saveEdited();
  }
  closeDialog();
}

function closeDialog() {
  reset();
  modalIsOpen.value = false;
  my_modal_1.close();
}

function edit(post) {
  selectedId = post.id;
  title.value = post.title;
  description.value = post.description;
  content.value = post.text;
  formData = new FormData();
  action.value = 1;
  my_modal_1.showModal();
  modalIsOpen.value = true;
}

async function saveEdited() {
  console.log(selectedId);
  submitting.value = true;
  const updated = await pb.collection("posts").update(selectedId, assembleEditPost());
  await getAllPosts();
  submitting.value = false;
  closeDialog();
}
async function saveNew() {
  submitting.value = true;
  assemblePost();
  const created = await pb.collection("posts").create(formData);
  await getAllPosts();
  submitting.value = false;
  closeDialog();
  return created;
}

async function confirmDelete() {
  submitting.value = true;
  const record = await pb.collection("posts").getOne(selectedId, {});
  console.log(record);
  await pb.collection("posts").delete(record.id);
  await getAllPosts();
  closeDeleteDialog();
  submitting.value = false;
}
</script>