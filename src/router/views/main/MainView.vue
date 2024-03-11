<script setup lang="ts">

import PostCard from "../../../components/ui/posts/PostCard.vue";
import {onMounted, ref} from "vue";
import {isEnd, loadPostsData, posts} from "../../../storages/posts/posts-storage.ts";
import BaseButton from "../../../components/ui/buttons/base-button.vue";
import BaseDropdown from "../../../components/ui/ dropdown/BaseDropdown.vue";
import {category, loadCategoryData} from "../../../storages/category-storage.ts";
import {Dropdown} from "../../../types/dropdown.ts";
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
  loadPostsData(true)
  loadCategoryData()
})

const selectIdCategory = ref<number | null>(null)
const selectIdOrder = ref<number | null>(null)

const orderList = ref<Dropdown[]>([
  {
    id: 1,
    title: 'Просмотры (убыв.)'
  },
  {
    id: 2,
    title: 'Просмотры (возр.)'
  },
  {
    id: 3,
    title: 'Дата (убыв.)'
  },
  {
    id: 4,
    title: 'Дата (возр.)'
  }
])

const openUserPost = (username: string) => {
  router.push({ name: 'index.user-posts', params: { username } });
}
const openView = (id: number) => {
  router.push({ name: 'index.view', params: { id } });
}

const loadNext = () => {
  loadPostsData(false)
}
const clearDropdown = () => {
  selectIdCategory.value = null;
  selectIdOrder.value = null;
  loadPostsData(true)
}
const clickSearch = () => {
  let orderName: string | null = null;
  let orderType: string | null = null;
  let category: number | null = null;

  if (selectIdOrder.value && selectIdOrder.value > 2) {
    orderName = 'created_at'
  }
  if (selectIdOrder.value) {
    orderType = selectIdOrder.value % 2 == 0 ? 'ASC' : null
  }

  if (selectIdCategory.value) {
    category = selectIdCategory.value;
  }

  loadPostsData(true, category, orderName, orderType)
}
</script>

<template>
  <div class="pt-12 sm:p-8 mx-auto max-w-[1170px]">
    <div v-if="posts.length > 0" class="flex flex-col gap-8">
      <div class="mx-auto sm:mx-0">
        <h1 class="text-xl sm:text-3xl px text-gray-900 font-bold">Главная</h1>
      </div>
      <div class="flex flex-wrap flex-col sm:flex-row gap-8 justify-center sm:justify-between">
        <div class="flex flex-col sm:flex-row gap-8 items-center flex-wrap">
          <base-dropdown placeholder="Выберите категорию" v-model="selectIdCategory" :list="category"/>
          <base-dropdown placeholder="Сортировать" v-model="selectIdOrder" :list="orderList"/>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-8">
          <XMarkIcon @click="clearDropdown" class="h-6 cursor-pointer"></XMarkIcon>
          <base-button @click="clickSearch" class="max-w-36">Поиск</base-button>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-12 w-full">
        <post-card
            v-for="post in posts"
            :key="post.id"
            :category="post.category"
            :created_at="post.created_at"
            :id="post.id"
            :title="post.title"
            :user="post.user"
            :views="post.views"

            @clickUser="openUserPost"
            @clickOpen="openView"
        />
      </div>
      <div v-if="!isEnd" class="w-36 py-12 mx-auto">
        <base-button @click="loadNext">Загрузить еще</base-button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-8">
      <div class="mx-auto sm:mx-0">
        <h1 class="text-3xl px text-gray-900 font-bold">Главная</h1>
      </div>
      <div>
        <p>Постов пока нет!</p>
      </div>
    </div>
  </div>
</template>