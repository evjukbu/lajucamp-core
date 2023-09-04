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
            <a v-if="props.contributor.insta !== undefined" :href="props.contributor.insta">
                <button class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>


                </button>
            </a>
            <a v-if="props.contributor.web !== undefined" :href="props.contributor.web">
                <button class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                    </svg>



                </button>
            </a>

        </div>

    </div>
</template>

<script setup>
const props = defineProps(["contributor"])
</script>