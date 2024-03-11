<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <LogoSvg class="mx-auto h-10 w-auto"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Создать аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="full_name" class="block text-sm font-medium leading-6 text-gray-900">Ваше имя</label>
          <div class="mt-2">
            <base-input v-model="name" id="full_name" name="full_name" type="text" autocomplete="name"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Адрес электронной почты</label>
          <div class="mt-2">
            <base-input v-model="email" id="email" name="email" type="email" autocomplete="email"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          <div class="mt-2">
            <base-input v-model="password" id="password" name="password" type="password" autocomplete="new-password"
                        class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <base-button type="submit"
                       class="flex w-full justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Зарегистрироваться
          </base-button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Уже есть аккаунт?
        {{ ' ' }}
        <router-link class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                     :to="{name: 'authorization.signin'}">
          Войдите здесь
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import BaseButton from "../../ui/buttons/base-button.vue";
import {ref} from "vue";
import BaseInput from "../../ui/input/base-input.vue";
import AuthService from "../../../api/service/auth-service.ts";
import {addErrorMessage} from "../../../storages/error-bus.ts";
import {useRouter} from "vue-router";
import LogoSvg from "../../../assets/LogoSvg.vue";
const router = useRouter();


const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const submitForm = () => {

  AuthService.registration({
    locale: 'ru',
    username: name.value,
    email: email.value,
    password: password.value
  })
      .then((res) => {
        localStorage.setItem('authToken', res.data.data.token)
        router.push({name: 'index.main'})
        window.location.reload();
      })
      .catch(error => {
        addErrorMessage(error);
      });

}
</script>