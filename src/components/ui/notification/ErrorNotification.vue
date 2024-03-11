<template>
  <div class="fixed top-6 right-6">
    <transition-group
        :duration="{enter:1000, leave: 1000}"
        enter-active-class="transition-all ease-in-out"
        leave-active-class="transition-all ease-in-out"
        enter-from-class="opacity-0 translate-x-2"
        leave-to-class="opacity-0 translate-x-2">
      <div v-for="(errorMessage, index) in errorMessages" :key="index"
           @click="removeErrorMessage(index)"
           class="cursor-pointer error-message bg-red-400 text-white px-4 py-2 mb-2 rounded shadow">
        {{ errorMessage }}
      </div>
    </transition-group>
  </div>
</template>



<script setup lang="ts">
import {errorMessages} from "../../../storages/error-bus.ts";
import {ref, watchEffect} from 'vue';

const timeoutIds = ref<number[]>([]);

const removeErrorMessage = (index: number) => {
  errorMessages.value.splice(index, 1);
  clearTimeout(timeoutIds.value[index]);
};

const autoHideErrorMessage = (index: number) => {
  timeoutIds.value[index] = setTimeout(() => {
    removeErrorMessage(index);
  }, 3000);
};

watchEffect(() => {
  const lastIndex = errorMessages.value.length - 1;
  autoHideErrorMessage(lastIndex);
});
</script>

