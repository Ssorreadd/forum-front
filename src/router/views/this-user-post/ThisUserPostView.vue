<script setup lang="ts">
import {onMounted, ref} from "vue";
import {loadThisUserPostsData, thisUserPosts, isEnd} from "../../../storages/posts/this-user-post-storages.ts";
import {user} from "../../../storages/users-storages.ts";
import {category} from "../../../storages/category-storage.ts";
import {Dropdown} from "../../../types/dropdown.ts";
import BaseDropdown from "../../../components/ui/ dropdown/BaseDropdown.vue";
import BaseButton from "../../../components/ui/buttons/base-button.vue";
import {XMarkIcon} from '@heroicons/vue/24/outline'
import PostCard from "../../../components/ui/posts/PostCard.vue";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
  thisUserPosts.value = []
  loadThisUserPostsData(false, user.value?.username!);
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
const loadNext = () => {
  loadThisUserPostsData(false, user.value?.username!)
}

const clearDropdown = () => {
  selectIdCategory.value = null;
  selectIdOrder.value = null;
  loadThisUserPostsData(true, user.value?.username!)
}
const clickSearch = () => {
  let orderName: string | null = null;
  let orderType: string | null = null;
  let category: number | null = null;

  if (selectIdOrder.value && selectIdOrder.value > 2){
    orderName = 'created_at'
  }
  if (selectIdOrder.value){
    orderType = selectIdOrder.value % 2 == 0 ? 'ASC' : null
  }

  if (selectIdCategory.value){
    category = selectIdCategory.value;
  }

  loadThisUserPostsData(true, user.value?.username!, category, orderName, orderType)
}

const openView = (id: number) => {
  router.push({ name: 'index.view', params: { id } });
}




</script>

<template>
  <div class="pt-12 sm:p-8 mx-auto flex flex-col gap-8 max-w-[1170px]">
    <div v-if="thisUserPosts.length > 0" class="flex flex-col gap-8 ">
      <div class="mx-auto sm:mx-0">
        <h1 class="text-xl sm:text-3xl px text-gray-900 font-bold">Мой блог</h1>
      </div>
      <div class="flex flex-wrap gap-8 justify-center items-s sm:justify-between">
        <div class="flex flex-col items-center sm:flex-row gap-8 flex-wrap">
          <base-dropdown placeholder="Выберите категорию" v-model="selectIdCategory" :list="category"/>
          <base-dropdown placeholder="Сортировать" v-model="selectIdOrder" :list="orderList"/>
        </div>
        <div class="flex items-center gap-8">
          <XMarkIcon @click="clearDropdown" class="h-6 cursor-pointer"></XMarkIcon>
          <base-button @click="clickSearch" class="max-w-36">Поиск</base-button>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-12 w-full">
        <post-card
            v-for="post in thisUserPosts"
            :key="post.id"
            :category="post.category"
            :created_at="post.created_at"
            :id="post.id"
            :title="post.title"
            :user="post.user"
            :views="post.views"

            @clickOpen="openView"
        />
      </div>
      <div v-if="!isEnd" class="w-36 py-12 mx-auto">
        <base-button @click="loadNext">Загрузить еще</base-button>
      </div>
    </div>
    <div v-else class=" flex flex-col gap-8 ">
      <div class="mx-auto sm:mx-0">
        <h1 class="text-3xl px text-gray-900 font-bold">Мой блог</h1>
      </div>
      <div>
        <p>Постов пока нет!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>