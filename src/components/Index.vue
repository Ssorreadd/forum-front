<script setup lang="ts">

import {ref, watch} from "vue";
import BaseHeader from "./ui/headers/BaseHeader.vue";

const content = ref<string>('');

watch(content, () => {
  console.log(content.value)
})
</script>

<template>
  <base-header/>
  <router-view/>
</template>

<style scoped>

</style>