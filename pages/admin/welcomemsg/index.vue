<template>
  <AdminLayoutHeader title="Willkommensnachrichten verwalten"
    subtitle="Hier kannst du die Willkommensnachrichten, die auf der Startseite angezeigt werden, verwalten." :path="[
      { name: 'Home', path: '/admin', active: false },
      { name: 'Willkommensnachrichten', path: '/admin/welcomemsg', active: true },
    ]">
    <button class="btn btn-primary" @click="openCreateDialog()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
      </svg>
      Neue Willkommensnachricht
    </button>
  </AdminLayoutHeader>
  <dialog id="modal_form" class="modal">
    <div class="modal-box w-11/12 max-w-7xl">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <h3 v-if="action === 0" class="font-bold text-lg">Willkommensnachricht erstellen</h3>
      <h3 v-if="action === 1" class="font-bold text-lg">Willkommensnachricht bearbeiten</h3>
      <div class="py-4">
        <div v-if="error" role="alert" class="alert alert-error mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>

          <div>
            Die Willkommensnachricht konnte nicht gespeichert werden.
            <DevOnly>
              <span class="mt-4">{{ errorMessage }} </span>
            </DevOnly>
          </div>
        </div>
        <div class="label">
          <span class="label-text">Titel</span>
        </div>
        <input type="text" v-model="title" placeholder="Beispieltitel" class="input input-bordered w-full"
          :disabled="submitting" />
        <div class="label">
          <span class="label-text">Text</span>
        </div>
        <textarea type="textarea" v-model="message" placeholder="Hier könnte Ihre Werbung stehen!"
          class="input input-bordered w-full" :disabled="submitting" />
        <div class="label">
          <div class="flex flex-row justify-between">
            <div class="flex flex-row space-x-2">
              <span class="label-text">Priorität</span>
              <div>
                <div class="tooltip tooltip-right"
                  data-tip="Wenn mehrere Willkommensnachrichten aktiviert sind, wird die mit der höheren Priorität weiter oben angezeigt.">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <div class="w-full">
            <input type="range" min="0" max="100" class="range range-secondary" step="1" v-model="priority" />
            <div class="w-full flex justify-between text-xs px-2">
              <span>Niedrig</span>
              <span>Hoch</span>
            </div>
          </div>
          <div>
            <input type="number" class="input w-24 ml-3" v-model="priority" />
          </div>
        </div>
        <label class="label cursor-pointer mt-3">
          <span class="label-text">Sichtbar</span>
          <input type="checkbox" class="toggle" v-model="enabled" />
        </label>
        <div class="label">
          <span class="label-text">Linkziel</span>
        </div>
        <AdminLinkTargetSelector v-if="is_open" v-model="target" :disabled="submitting" />
      </div>
      <div class="modal-action">
        <button class="btn pr-3" :disabled="submitting" @click="closeDialog()">
          Abbrechen
        </button>
        <button @click="save()" :disabled="submitting || title === null || title === ''" class="btn btn-primary">
          <div v-if="submitting">
            <span v-if="submitting" class="loading loading-spinner loading-xs"></span>
            Übertragen...
          </div>
          <div v-else>Speichern</div>
        </button>
      </div>
    </div>
  </dialog>
  <dialog id="modal_delete" class="modal">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeDeleteDialog()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
      <h3 class="font-bold text-lg">Diese Willkommensnachricht wirklich löschen?</h3>
      <div class="py-4">
        <div v-if="error" role="alert" class="alert alert-error mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>

          <div>
            Die Willkommensnachricht konnte nicht gelöscht werden.
            <DevOnly>
              <span class="mt-4">{{ errorMessage }} </span>
            </DevOnly>
          </div>
        </div>
        Dieser Vorgang kann nicht rückgängig gemacht werden.
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
  <div class="pl-3">
    <div class="overflow-x-auto">
      <AdminWelcomeMessageList :data="data" @enable="toggleState" @disable="toggleState" @delete="deleteDialog"
        @edit="edit" />
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

// 0: Create, 1: Edit
let action = ref(-1);

const title = ref(null);
const message = ref(null);
const target = ref(null);
const enabled = ref(false)
const priority = ref(50);
let selectedId = 0;

const is_open = ref(false)

function reset() {
  title.value = null;
  message.value = null;
  action.value = -1;
  priority.value = 50;
  target.value = null;
  enabled.value = false;
  error.value = false
}

async function getAllMessages() {
  let payload = {
    sort: "order",
  };
  data.value = await pb.collection("welcome_messages").getFullList(payload);
}

await getAllMessages();

async function toggleState(message) {
  const data = { enabled: !message.enabled };
  const record = await pb.collection("welcome_messages").update(message.id, data);
  await getAllMessages();
  return record;
}

function closeDeleteDialog() {
  modal_delete.close();
  selectedId = -1;
}

function deleteDialog(index) {
  error.value = false;
  modal_delete.showModal();
  selectedId = data.value[index].id;
}

async function confirmDelete() {
  submitting.value = true;
  try {
    await pb.collection("welcome_messages").delete(selectedId);
    await getAllMessages();
  } catch (e) {
    error.value = true;
    errorMessage.value = e.message;
  } finally {
    if (error.value !== true) {
      closeDeleteDialog();
    }
    submitting.value = false;
  }
}

function openCreateDialog() {
  is_open.value = true
  action.value = 0;
  modal_form.showModal();
}

function closeDialog() {
  modal_form.close();
  action.value = -1;
  is_open.value = false
  reset();
}

function assembleWelcomeMessage() {
  return {
    title: title.value,
    text: message.value,
    target: target.value,
    order: 100 - priority.value,
    enabled: enabled.value,
  };
}

async function saveNew() {
  submitting.value = true;
  try {
    await pb.collection("welcome_messages").create(assembleWelcomeMessage());
    await getAllMessages();
  } catch (e) {
    error.value = true;
    errorMessage.value = e.message;
  } finally {
    if (error.value !== true) {
      closeDialog();
    }
    submitting.value = false;
  }
}

async function saveEdited() {
  submitting.value = true;
  try {
    await pb.collection("welcome_messages").update(selectedId, assembleWelcomeMessage());
    await getAllMessages();
  } catch (e) {
    error.value = true;
    errorMessage.value = e.message;
  } finally {
    if (error.value !== true) {
      closeDialog();
    }
    submitting.value = false;
  }
}

async function save() {
  if (action.value === 0) {
    await saveNew();
  }
  if (action.value === 1) {
    await saveEdited();
  }
}

function edit(welcome_message) {
  is_open.value = true
  console.log(welcome_message)
  selectedId = welcome_message.id;
  title.value = welcome_message.title;
  message.value = welcome_message.text;
  target.value = welcome_message.target;
  priority.value = 100 - welcome_message.order;
  action.value = 1;
  enabled.value = welcome_message.enabled;
  modal_form.showModal();
}
</script>
