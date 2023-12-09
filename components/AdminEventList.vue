<template>
  <table v-if="props.data !== null && props.data.length > 0" class="table">
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
      <tr v-for="(event, index) in props.data" :key="index">
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
            @click="$emit('edit', event)"
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
            @click="$emit('delete', index)"
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
  <AdminNoDataHero
    v-else
    message="Derzeit existieren keine Veranstaltungen, für die du
  Zugriffsrechte besitzt. Überprüfe, ob du dem richtigen Sprengel zugeordnet bist oder
  lege eine neue Veranstaltung an."
  />
</template>
<script setup>
const props = defineProps(["data"]);
const pb = usePocketBase();
</script>
