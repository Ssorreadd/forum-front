<template>
    <quill-editor theme="snow" contentType="html" :options="editorOptions"/>
</template>

<script setup lang="ts">
import {QuillEditor} from "@vueup/vue-quill";

const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video', 'formula'],
      // [{ 'align': ['center', 'right'] }], // кнопки выравнивания
      ['clean']
    ],
  },
  theme: 'snow'
};

</script>