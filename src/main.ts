import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {QuillEditor} from "@vueup/vue-quill";
import router from "./router/router.ts";
import {checkAuth} from "./helpers/check-auth.ts";

const app = createApp(App);
app.component('QuillEditor', QuillEditor)

app.directive('click-outside', {
    mounted(el, binding) {
        el.clickOutsideEvent = function (event: Event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
});

router.beforeEach((to, from, next) => {
    const authorized= checkAuth()

    if (to?.name?.toString().includes('authorization') && authorized) {
        next(from?.name === '' ? '/' : '/');
        return
    }

    if (to.matched.some((record) => record.meta.requiresAuth) && !authorized) {
        next({ name: 'authorization.signin' });
    } else {
        next()
    }
})

const errorBus = createApp({});
export default errorBus;

app.use(router).mount('#app');


