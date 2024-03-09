<template>
  <input
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="updateValue"
      :class="inputClass"
      :type="type"
      class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
</template>

<script setup lang="ts">

const emits = defineEmits(['update:modelValue', 'btnPass'])

defineProps({
  modelValue: {type: [String, Number, Date, Array] as any, default: null},
  type: {type: String},
  autocomplete: {type: String},
  isDisabled: {type: Boolean, default: false},
  inputClass: {type: String, default: ''}
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}


</script>