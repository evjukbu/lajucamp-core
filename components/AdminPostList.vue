<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="data.length !== 0">
    <AdminNewsCard
      v-for="(post, index) in data"
      :key="post.id"
      :post="post"
      :index="index"
      @edit="edit"
      @delete="deletePost"
    />
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
const emits = defineEmits(["edit", "delete"]);

function edit(post) {
  emits("edit", post);
}

function deletePost(index) {
  emits("delete", index);
}
</script>
