import { type RouteRecordRaw } from 'vue-router';

const AuthRouter: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import('@/modules/auth/views/Login.vue')
        },
        {
            path: 'register',
            name: 'register',
            component: () => import('@/modules/auth/views/Register.vue')
        }
    ]
}

export default AuthRouter;