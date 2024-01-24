<template>
  {{ selectedCam }}
  <div style="position: relative;">
    <div class="overflow-hidden flex justify-center items-center h-full">
      <div :class="`overflow-hidden flex justify-center items-center h-full ${flip ? 'flip' : ''}`">
        <video id="qr-video" :class="`h-full transition-all duration-150 ease-in-out filter brightness-100 ${blink ? 'blink' : ''}`"></video>
      </div>
      <div v-if="props.overlaypath" class="w-full h-80 absolute top-0 left-0 flex justify-center items-center">
        <img :src="`${props.overlaypath}`" class="w-60vw max-w-50 aspect-w-1 aspect-h-1 max-h-50% h-50vh">
      </div>
    </div>
    <button @click="showSettings = true" class="absolute right-4 top-4 z-50 text-grey-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-10 h-10">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <div v-if="showSettings" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      style="z-index: 1000;">
      <div class="relative top-20 mx-auto px-3 border sm:w-auto shadow-lg rounded-md bg-white w-400px max-w-90%">
        <div class="mt-3 text-center">
          <div class="mt-2">
            <p class="text-lg leading-6 font-medium text-gray-900">Settings</p>
            <div class="mt-2">
              <!--TODO: check multi cam... $event.target maybe not working-->
              <select @change="setCamera" v-model="camid_storage"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option v-for="cam in cams" :value="cam.label" class="">{{ cam.label }}</option>
              </select>
            </div>
            <div class="mt-4">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox" v-model="flip">
                <span class="ml-2">Flip</span>
              </label>
            </div>
          </div>
          <div class="items-center px-4 py-3">
            <button id="ok-btn" @click="showSettings = false"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { useLocalStorage } from '@vueuse/core';
import QrScanner from 'qr-scanner';

const camid_storage = useLocalStorage('camid', '');
const scanner_result_storage = useLocalStorage('result', []);

const props = defineProps({
  reset: {
    type: Boolean,
    default: false
  },
  overlaypath: {
    type: String,
    default: ''
  }
});

const emit = defineEmits<{
  onScan: [value: string]
  results: [value: string[]]
  "update:reset": [value: boolean]
}>()

let cams = ref<QrScanner.Camera[]>([]);
let qrScanner = ref<QrScanner>();

let showSettings = ref(false);

let blink = ref(false);
let flip = ref(false);

let results = ref<string[]>([]);


function setCamera() {
  let label = camid_storage.value;
  let id = cams.value.find(el => el.label == label)?.id || camid_storage.value || '';
  qrScanner.value?.setCamera(id);
}

onMounted(() => {
  if (process.client) {
    QrScanner.listCameras(true).then((devices: QrScanner.Camera[]) => {
      cams.value = devices;
      console.log(devices);
    });

    const vid = window.document.getElementById('qr-video');
    qrScanner.value = new QrScanner(vid as HTMLVideoElement, (result: any) => {
      if (result instanceof Error) return;
      results.value.unshift(result);
      emit('onScan', result);
      emit('results', results.value);
      blink.value = true;
      setTimeout(() => blink.value = false, 300);
    });
    try {
      qrScanner.value.start();
    } catch (e) {
      console.log(e);
    }
  }
});

function clearHistory() {
  results.value = [];
}

onUnmounted(() => {
  qrScanner.value?.stop();
});

watch(() => props.reset, () => {
  if (!props.reset) return;
  clearHistory();
  emit('update:reset', false);
});

scanner_result_storage.value = results.value;
</script>

<style scoped>

.flip {
  -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}

.blink {
  filter: brightness(5);
}

.history {
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 30vh;
  background-color: transparent;
  overflow: hidden;
}

.mode {
  position: fixed;
  top: 5px;
  left: 0;
  width: 100px;
  height: 30vh;
  background-color: transparent;
  overflow: hidden;
}

.big {
  animation: scaleDown 0.5s ease-in-out;
}

@keyframes scaleDown {
  0% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}

.card {
  background-color: rgba(255, 255, 255, 1);
  color: rgba(1, 1, 1, 1);
  left: 2.5%;
  width: 95%;
  position: absolute;
  top: 95%;
}</style>