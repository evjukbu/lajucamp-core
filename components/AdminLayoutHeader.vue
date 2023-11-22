<template>
  <div class="pl-3">
    <div class="text-sm breadcrumbs">
      <ul>
        <li v-for="element in props.path">
          <RouterLink v-if="element.active !== true" :to="element.path">{{
            element.name
          }}</RouterLink>
          <span v-else>{{ element.name }} </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-row space-x-2">
      <h1 class="text-3xl">{{ title }}</h1>
      <div class="tooltip tooltip-bottom pt-2" :data-tip="subtitle">
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
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </div>
    </div>
    <div class="pb-8" />
  </div>
</template>

<script setup>
const props = defineProps(["title", "subtitle", "path"]);
</script>
