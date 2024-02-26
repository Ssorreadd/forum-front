import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {QuillEditor} from "@vueup/vue-quill";

const app = createApp(App);
app.component('QuillEditor', QuillEditor)

app.mount('#app');