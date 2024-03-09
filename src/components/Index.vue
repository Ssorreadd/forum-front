<script setup lang="ts">

import BaseTextEditor from "./ui/text-editor/BaseTextEditor.vue";
import {ref, watch} from "vue";

const content = ref<string>('');

watch(content, () => {
  console.log(content.value)
})
</script>

<template>
  <div class="h-[50dvh]">
    <h1 class="text-center bg-black text-5xl text-white">TEST</h1>
  </div>
  <div class="h-[50dvh]">
    <base-text-editor class="overflow-hidden overscroll-y-auto" v-model:content="content"/>
  </div>
</template>

<style scoped>

</style>