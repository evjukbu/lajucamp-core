<template>
    Test {{ $route }}
    <hr />
    {{ cookie }}
    <button class="btn" @click="cookieTest">Set cookie</button>
    <hr />
    {{ config }}
</template>

<script setup>
const cookie = useCookie("keys", { expires: new Date('9999-12-31') })
const config = useRuntimeConfig()

function cookieTest() {
    let temp = cookie.value
    cookie.value = JSON.stringify(temp, null, 2)
}
</script>