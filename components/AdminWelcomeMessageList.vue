<template>
  <table v-if="props.data !== null && props.data.length > 0" class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Willkommensnachricht</th>
        <th>Linkziel</th>
        <th>Priorität</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(message, index) in props.data" :key="index" class="hover">
        <td>
          <div class="flex items-center gap-3">
            <div>
              <div v-if="message.title !== '' && message.title !== ' '" class="font-bold">
                {{ message.title }}
              </div>
              <div v-else>N/A</div>
              <div class="font-light">{{ message.text }}</div>
            </div>
          </div>
        </td>
        <td>
          {{ getTargetType(message) }}
        </td>
        <td>
          <div class="flex items-center gap-3">{{ 100 - message.order }}</div>
        </td>
        <td class="flex flex-row space-x-1 justify-end">
          <!-- Active indicator -->
          <button v-if="message.enabled" @click="$emit('disable', message)"
            class="group btn btn-square btn-ghost hover:bg-green-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>

          </button>
          <!-- Inactive indicator -->
          <button v-else @click="$emit('enable', message)" class="group btn btn-square btn-ghost hover:bg-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 group-hover:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

          </button>
          <button @click="$emit('edit', message)" class="group btn btn-square btn-ghost hover:bg-cyan-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 group-hover:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button @click="$emit('delete', index)" class="group btn btn-square btn-ghost hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 group-hover:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Willkommensnachricht</th>
        <th>Linkziel</th>
        <th>Priorität</th>
        <th />
      </tr>
    </tfoot>
  </table>
  <AdminNoDataHero v-else message="Es wurden noch keine Willkommensnachrichten erstellt." />
</template>

<script setup>
const props = defineProps(["data"]);

function getTargetType(message) {
  if (message.target === "" || message.target === null || message.target === undefined) {
    return ""
  } else if (message.target.startsWith(" /events")) { return "Veranstaltung" } else if (message.target.startsWith("/posts")) {
    return "Nachrichtenpost"
  } else if (message.target.startsWith("/misc/page-")) { return "Interne Seite" } else { return "Externe Seite" }
}
</script>
