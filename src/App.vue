<script setup lang="ts">
import {ref, watch} from "vue";
import BaseTextEditor from "./components/TextEditors/BaseTextEditor.vue";

const content = ref<string>('');

watch(content, () => {
  console.log(content.value)
})
</script>

<template>
  <div class="h-[50dvh]">
    <base-text-editor class="overflow-hidden overscroll-y-auto" v-model:content="content"/>
  </div>
</template>
