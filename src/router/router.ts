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

const indexChildren: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index.main',
        component: () => import('../router/views/main/MainView.vue')
    },
    {
        path: '/my-posts',
        name: 'index.this.user-posts',
        meta: {requiresAuth: true},
        component: () => import('../router/views/this-user-post/ThisUserPostView.vue')
    },
    {
        path: '/create-post',
        name: 'index.create',
        meta: {requiresAuth: true},
        component: () => import('../router/views/create-post/CreatePostView.vue')
    },
    {
        path: '/about',
        name: 'index.about',
        component: () => import('../router/views/about/AboutView.vue')
    },
    {
        path: '/:username',
        name: 'index.user-posts',
        component: () => import('../router/views/user-posts/UserPostsView.vue')
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
        children: indexChildren
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
