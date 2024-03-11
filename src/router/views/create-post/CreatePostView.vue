<script setup lang="ts">

import BaseInput from "../../../components/ui/input/base-input.vue";
import {ref} from "vue";
import BaseDropdown from "../../../components/ui/ dropdown/BaseDropdown.vue";
import {category} from "../../../storages/category-storage.ts";
import BaseTextEditor from "../../../components/ui/text-editor/BaseTextEditor.vue";
import BaseButton from "../../../components/ui/buttons/base-button.vue";
import PostsService from "../../../api/service/posts-service.ts";
import {user} from "../../../storages/users-storages.ts";
import {addErrorMessage} from "../../../storages/error-bus.ts";
import {loadThisUserPostsData} from "../../../storages/posts/this-user-post-storages.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const title = ref<string>('')
const selectCategoryId = ref<number | null>(null)
const content = ref<string>('');


const clickPushBlog = () => {
  PostsService.createPost({
    user_id: user.value?.id!,
    title: title.value,
    content: content.value,
    category_id: selectCategoryId.value!
  })
      .then(() => {
        loadThisUserPostsData(true, user.value?.username!)
        router.push({ name: 'index.this.user-posts', params: { user: user.value?.username! } });
      })
      .catch((error) => {
        addErrorMessage(error);
      })
}

</script>

<template>
  <div class="pt-12 p-4 sm:p-8 mx-auto flex flex-col gap-8 max-w-[1170px]">
    <div class="mx-auto sm:mx-0">
      <h1 class="text-3xl px text-gray-900 font-bold">Создание статьи</h1>
    </div>

    <div>
      <label for="Title" class="block text-sm font-medium leading-6 text-gray-900 w-fit">Название статьи</label>
      <div class="mt-2 w-fit">
        <base-input v-model="title" id="password" name="password" type="text"/>
      </div>
    </div>
    <div>
      <label for="Title" class="block text-sm font-medium leading-6 text-gray-900 w-fit">Категория</label>
      <div class="mt-2 w-fit">
        <base-dropdown v-model="selectCategoryId" :list="category"/>
      </div>
    </div>

    <div>
      <base-text-editor class="overflow-hidden overscroll-y-auto" v-model:content="content"/>
    </div>

    <div class="w-fit">
      <base-button @click="clickPushBlog">Опубликовать</base-button>
    </div>
  </div>
</template>

<style scoped>

</style>