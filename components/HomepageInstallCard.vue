<template>
  <LinkHelper :target="target"
    v-if="(cookie === undefined || cookie !== true) && supported && (route.query.standalone === undefined || route.query.standalone !== 'true')">
    <div class="card card-compact bg-base-100 shadow-lg" to="/">
      <div class="card-body">
        <h2 class="card-title">App installieren <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

          </span>
        </h2>
        <div class="card-content">
          Hier tippen, um die App auf deinem {{ deviceName }} zu installieren.
        </div>
      </div>
    </div>
    <br />
  </LinkHelper>
</template>

<script setup>
const device = useDevice()
const route = useRoute()
const cookie = useCookie("installed", { expires: new Date('9999-12-31') })
const deviceName = ref("")
const supported = ref(true)
const target = ref("/")
if (device.isIos) {
  deviceName.value = "iPhone"
  target.value = "/misc/install"
} else {
  if (device.isAndroid) {
    deviceName.value = "Android"
    target.value = "https://play.google.com/store/apps/details?id=de.kjdburgdorf.festival"
  } else {
    supported.value = false
  }
}
</script>
