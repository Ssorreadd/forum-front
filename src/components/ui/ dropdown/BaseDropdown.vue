<template>
  <div class="relative">
    <div v-click-outside="outsideShow" class="inline-flex items-center overflow-hidden rounded-md border bg-white">
      <a @click="show = !show; resetSelectedValue()" href="#" class="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
        {{ value }}
      </a>

      <button @click="show = !show; resetSelectedValue()" class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
        <span class="sr-only">Menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

    <ul v-show="show" class="absolute z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
      <li v-for="data in list" :key="data.id">
        <a @click="changeValue(data); show = false;" href="#" class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
          {{ data.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, ref, computed} from 'vue';
import { Dropdown } from "../../../types/dropdown.ts";

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: { type: Number as () => null | number, default: null },
  list: { type: Array as () => Dropdown[], required: true },
  placeholder: { type: String, default: 'Выбрать' },
});

const outsideShow = () => show.value = false;

const show = ref<boolean>(false);
const selectedValue = ref<number | null>(null);

const value = computed(() => {
  const temp = props.list?.find((element) => element.id === props.modelValue)?.title ?? '';
  return temp ? temp : props.placeholder ?? '';
});

const resetSelectedValue = () => {
  selectedValue.value = null;
  emit('update:modelValue', null);
};

const changeValue = (value: Dropdown) => {
  emit('update:modelValue', value.id);
  selectedValue.value = value.id;
  show.value = false;
  emit("change", value);
};
</script>
