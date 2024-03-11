<template>
  <nav class="shadow">
    <div class="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div class="flex-shrink-0">
        <router-link :to="{name: 'index.main'}">
          <LogoSvg  class="mx-auto h-10 w-auto"/>
        </router-link>
      </div>

      <div class="hidden sm:flex sm:items-center sm:justify-center flex-grow">
        <router-link :to="{name: 'index.main'}" class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Главная</router-link>
        <router-link :to="{name: 'index.this.user-posts'}" class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Мои посты</router-link>
        <router-link :to="{name: 'index.create'}" class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Создать пост</router-link>
        <router-link :to="{name: 'index.about'}" class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">О нас</router-link>
      </div>

      <div v-if="isAuth" class="hidden sm:flex items-center ml-4 space-x-4">
        <base-button @click="signIn">Войти</base-button>
        <base-button @click="signUp">Регистрация</base-button>
      </div>
      <div v-else class="hidden items-center ml-4 space-x-4">
        <base-button @click="logout">Выйти</base-button>
      </div>

      <div class="flex items-center sm:hidden">
        <button @click="toggleMenu" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link :to="{name: 'index.main'}" class="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Главная</router-link>
        <router-link :to="{name: 'index.this.user-posts'}" class="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Мои посты</router-link>
        <router-link :to="{name: 'index.create'}" class="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Создать пост</router-link>
        <router-link :to="{name: 'index.about'}" class="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">О нас</router-link>
      </div>

      <div v-if="isAuth" class="w-1/3 px-2 pt-2 pb-3 space-y-1">
        <base-button @click="signIn" class="mb-2">Войти</base-button>
        <base-button @click="signUp">Регистрация</base-button>
      </div>
      <div v-else class="w-1/3 px-2 pt-2 pb-3 space-y-1">
        <base-button @click="logout" class="mb-2 ">Выйти</base-button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from "../buttons/base-button.vue";
import {useRouter} from "vue-router";
import {checkAuth} from "../../../helpers/check-auth.ts";
import AuthService from "../../../api/service/auth-service.ts";
import LogoSvg from "../../../assets/LogoSvg.vue";

const isAuth = !checkAuth();
const isMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const signIn = () => {
  router.push({ name: 'authorization.signin' });
}

const signUp = () => {
  router.push({ name: 'authorization.signup' });
}
const logout = () => {
  AuthService.logout().then(() => {
    localStorage.clear()
    window.location.reload();
  })
}
</script>
