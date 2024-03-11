<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {loadPostData, post} from "../../../storages/posts/open-post-storage.ts";
import BaseBadge from "../../../components/ui/badge/BaseBadge.vue";
import {EyeIcon, UserIcon} from "@heroicons/vue/24/outline";

const router = useRouter();
const id = ref<number>()
onMounted(() => {
  id.value = parseInt(router?.currentRoute?.value?.params['id'].toString());
  loadPostData(id.value)
})
</script>

<template>
  <div class="pt-12 px-4 sm:p-8 mx-auto flex flex-col gap-8 max-w-[1170px]">
    <h1 class="text-3xl px text-gray-900 font-bold">{{ post?.title }}</h1>
    <div class="flex gap-8 items-center">
      <base-badge>{{ post?.category.title }}</base-badge>

      <div class="flex items-center gap-1">
        <EyeIcon class="h-4"></EyeIcon>
        <p>{{ post?.views }}</p>
      </div>

      <div
          class="cursor-pointer flex items-center gap-1"
      >
        <UserIcon class="h-4"></UserIcon>
        <p>{{post?.user.username}}</p>
      </div>

      <time class="block text-xs text-gray-500">{{post?.created_at}}</time>


    </div>
    <div>
      <div v-html="post?.content"></div>
    </div>
  </div>
</template>

<style scoped>

</style>