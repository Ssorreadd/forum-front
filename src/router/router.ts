import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const authorizationChildren: RouteRecordRaw[] = [
    {
        path: '',
        name: 'authorization.signin',
        component: () => import('../components/pages/authorization/SignInPage.vue')
    },
    {
        path: '/signup',
        name: 'authorization.signup',
        component: () => import('../components/pages/authorization/SignUpPage.vue')
    }
]

const routes: RouteRecordRaw[] = [
    {
        path: '/authorization',
        name: 'authorization',
        component: () => import('../router/views/authorization/AuthorizationView.vue'),
        children: authorizationChildren
    },
    {
        path: '/',
        name: 'index',
        component: () => import('../components/Index.vue'),
        meta: {requiresAuth: true},
        children: [

        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, _ , next) => {
    document.title = (typeof to.meta.title === 'string' ? to.meta.title : 'loading...');
    next();
});
export default router;
