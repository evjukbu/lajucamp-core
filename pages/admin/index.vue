<template>
  <AdminHomeGreeting />
  <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
    <div class="stat">
      <div class="stat-title">Meine Events</div>
      <div class="stat-value text-orange-600">{{ myEvents }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Events</div>
      <div class="stat-value text-purple-600">{{ allEvents }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Kategorien</div>
      <div class="stat-value text-red-600">{{ allCats }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Posts</div>
      <div class="stat-value text-green-600">{{ allPosts }}</div>
    </div>
  </div>

  <div class="pt-3 flex md:flex-row flex-col space-y-5 md:space-x-5">
    <HomepageWelcomeCardBundle class="w-full" />
    <HomepageEventListCard class="w-full" />
    <SingleNewsCard class="w-full" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

const pb = usePocketBase();
const eventManager = useEventManager();
const categoryManager = useCategoryManager();
const postManager = usePostManager();

const allEvents = (await eventManager.getList()).length;
const allCats = (await categoryManager.getList()).length;
const allPosts = (await postManager.getList()).length;
const myEvents = (await eventManager.getList(-1, pb.authStore.model.team)).length;
</script>
