<script setup lang="ts">

import PostCard from "../../../components/ui/posts/PostCard.vue";
import {onMounted} from "vue";
import {isEnd, loadPostsData, posts} from "../../../storages/posts/posts-storage.ts";
import BaseButton from "../../../components/ui/buttons/base-button.vue";

onMounted(() => {
  loadPostsData(true)
})

const openUserPost = (id: number) => {

}
const loadNext = () => {
  loadPostsData(false)
}
</script>

<template>
  <div class="pt-12 w-1/2 mx-auto">
    <div class="sm:p-8">
      <h1 class="text-4xl px text-gray-900 font-bold">Главная</h1>
    </div>
    <div
        class=" flex flex-wrap justify-center gap-12"

    >
      <post-card
          v-for="post in posts"
          :category="post.category"
          :created_at="post.created_at"
          :id="post.id"
          :title="post.title"
          :user="post.user"
          :views="post.views"

          @clickUser=""
      />
    </div>
    <div v-if="!isEnd" class="w-1/6 py-12 mx-auto">
      <base-button @click="loadNext">Загрузить еще</base-button>
    </div>

  </div>
</template>

<style scoped>

</style>