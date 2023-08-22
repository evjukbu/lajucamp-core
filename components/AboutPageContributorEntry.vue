<template>
    <div>
        <div class="flex flex-row py-1 space-x-2">
            <div class="flex flex-col">
                <div class="avatar placeholder">
                    <div :class="props.contributor.color + ' text-base-100 rounded-full w-12'">
                        <span class="text-lg">{{ props.contributor.initials }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-1">
                <span class="font-bold">{{ props.contributor.name }} <div v-if="props.contributor.tag !== null"
                        class="badge badge-primary badge-outline">{{ props.contributor.tag }}</div>
                </span>
                <span class="text-sm font-light">{{ props.contributor.job }}</span>
            </div>
            <div class="flex-grow"></div>
            <a v-if="props.contributor.insta !== null" :href="props.contributor.insta">
                <button class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>


                </button>
            </a>

        </div>

    </div>
</template>

<script setup>
const props = defineProps(["contributor"])
</script>