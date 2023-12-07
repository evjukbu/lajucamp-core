<template>
  <div v-if="data === null" class="skeleton w-32 h-4"></div>
  <div v-else>
    <div class="flex flex-row space-x-2" v-if="data !== undefined">
      <div class="avatar" v-if="data.logo !== ''">
        <div class="w-4 rounded-full">
          <img :src="pb.files.getUrl(data, data.logo)" />
        </div>
      </div>
      <div class="font-light">{{ data.name }}</div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps(["team"]);
const data = ref(null);
const teamManager = useTeamManager();
const pb = usePocketBase();
data.value = await teamManager.getById(props.team);
</script>
