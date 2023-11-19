<template>
  <div v-if="data === null" class="skeleton w-32 h-4"></div>
  <div class="flex flex-row space-x-2" v-else>
    <div class="avatar">
      <div class="w-4 rounded-full">
        <img v-if="data.logo !== undefined" :src="pb.files.getUrl(data, data.logo)" />
      </div>
    </div>
    <div class="font-light">{{ data.name }}</div>
  </div>
</template>

<script setup>
const props = defineProps(["team"]);
const data = ref(null);
const teamManager = useTeamManager();
const pb = usePocketBase();
data.value = await teamManager.getById(props.team);
</script>
