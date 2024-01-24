<template>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Kameraeinstellungen</h3>
      <div class="pt-4">
        <p class="pb-4">Bitte wähle die Kamera aus, die du zum Scannen des QR-Codes verwenden möchtest.</p>
        <select @change="setCamera" v-model="camid_storage"
                class="select select-bordered w-full">
                <option v-for="cam in cams" :value="cam.label" class="">{{ cam.label }}</option>
              </select>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-secondary">OK</button>
        </form>
      </div>
    </div>
  </dialog>
  <div class="text-center pb-4 pt-2">
    <span class="text-sm font-light">Bitte platziere den QR Code mittig im Feld.</span>
  </div>
  <div class="card relative card-compact m-0 p-0 border-0 shadow-none overflow-hidden min-h-96 max-h-96">
    <div class="flex justify-center items-center h-full">
      <div class="bg-neutral h-72 w-full flex justify-center items-center text-center align-center mx-auto" v-show="loading">
        <span class="loading loading-dots loading-lg text-base-100"></span><br />
      </div>
      <figure v-show="!loading">
        <div :class="`overflow-hidden flex justify-center items-center w-full min-h-72 max-h-72 ${flip ? 'flip' : ''}`">
          <video id="qr-video"
            :class="`object-cover object-center h-1/2 w-full transition-all duration-150 ease-in-out filter brightness-100 ${blink ? 'blink' : ''}`"></video>
        </div>
        <div v-if="props.overlaypath" class="w-full h-80 absolute top-0 left-0 flex justify-center items-center">
          <img :src="`${props.overlaypath}`" class="w-60vw max-w-50 aspect-w-1 aspect-h-1 max-h-50% h-50vh">
        </div>
      </figure>
    </div>
    <div class="flex flex-row w-full">
      <button @click="$emit('switchToManual')" class="w-1/2 btn rounded-r-none rounded-tl-none">Code eintippen</button>
      <button onclick="my_modal_1.showModal()" class="w-1/2 btn btn-secondary rounded-l-none rounded-tr-none">Einstellungen</button>
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
  "update:reset": [value: boolean],
  switchToManual: []
}>()

let cams = ref<QrScanner.Camera[]>([]);
let qrScanner = ref<QrScanner>();

let showSettings = ref(false);

let blink = ref(false);
let flip = ref(false);

let results = ref<string[]>([]);

const loading = ref(true)

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
      my_modal_1.close();
      emit('onScan', result);
      emit('results', results.value);
      blink.value = true;
      setTimeout(() => blink.value = false, 300);
    });
    try {
      qrScanner.value.start();
      loading.value = false
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
</style>