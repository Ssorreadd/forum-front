<script setup lang="ts">
import ErrorNotification from "./components/ui/notification/ErrorNotification.vue";
</script>

<template>
  <div class="w-full h-[100dvh] relative">
    <error-notification/>
    <router-view/>
  </div>
</template>
