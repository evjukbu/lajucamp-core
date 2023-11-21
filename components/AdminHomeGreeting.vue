<template>
  <h1 class="text-3xl pl-3 pt-3">Willkommen, {{ user.name }}!</h1>
  <TeamNote class="pl-3" :team="user.team" />
</template>

<script setup>
const pb = usePocketBase();
const teams = useTeamManager();
const user = pb.authStore.model;
</script>
