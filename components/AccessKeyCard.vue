<template>
    <div class="card bg-gradient-to-r from-green-400 to-cyan-500 text-primary-content shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-white">
                {{ props.accesskey.name}}
                <span class="badge badge-outline badge-white badge-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                            clip-rule="evenodd" />
                    </svg>

                </span>
            </h2>
            <p class="text-white">{{ props.accesskey.description }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["accesskey"])
</script>