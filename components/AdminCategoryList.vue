<template>
  <table v-if="props.data !== null && props.data.length > 0" class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Beschreibung</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category, index) in props.data" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div>
              <div v-if="category.name !== '' && category.name !== ' '" class="font-bold">
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
            @click="$emit('edit', category)"
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
            @click="$emit('delete', index)"
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
  <AdminNoDataHero
    v-else
    message="Es wurden noch keine Kategorien erstellt. Um Veranstaltungen
  anzulegen, muss mindestens eine Kategorie existieren."
  />
</template>

<script setup>
const props = defineProps(["data"]);
</script>
