<script setup lang="ts">

import {Category} from "../../../types/post/category-type.ts";
import {UserPost} from "../../../types/post/user-post-type.ts";
import {EyeIcon, UserIcon} from '@heroicons/vue/24/outline'
import BaseBadge from "../badge/BaseBadge.vue";
import BaseButton from "../buttons/base-button.vue";

defineProps({
  id: {type: Number, required: true},
  created_at: {type: String, required: true},
  title: {type: String, required: true},
  views: {type: [String, Number], required: true},
  user: {type: Object as () => UserPost, required: true},
  category: {type: Object as () => Category, required: true}
})

</script>

<template>
    <article class="overflow-hidden rounded-lg pb-4 sm:pb-6 shadow transition hover:shadow-lg max-w-[336px] max-h-[440px]">
      <img
          alt=""
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          class="h-56 w-full object-cover"
      />

      <div class="bg-white px-4 sm:px-6 pt-4 sm:pt-6">
        <time :datetime="created_at" class="block text-xs text-gray-500">{{created_at}}</time>

        <a href="#">
          <h3 class="mt-0.5 text-lg text-gray-900 truncate">{{ title }}</h3>
        </a>
      </div>
      <div class="p-4 sm:p-6 flex justify-between w-full">
        <div
            class="cursor-pointer flex items-center gap-1"
            @click="$emit('clickUser', user.username)"
        >
          <UserIcon class="h-4"></UserIcon>
          <p>{{user.username}}</p>
        </div>
        <div class="flex items-center gap-1">
          <EyeIcon class="h-4"></EyeIcon>
          <p>{{ views }}</p>
        </div>
      </div>

      <div class="px-4 sm:px-6 flex w-full items-center justify-between">
        <base-badge>{{category.title}}</base-badge>
        <div>
          <base-button @click="$emit('clickOpen', id)" class="bg-indigo-500">Открыть</base-button>
        </div>
      </div>
    </article>
</template>