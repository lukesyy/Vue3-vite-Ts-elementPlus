import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/index.vue')
const login = () => import('@/views/login.vue')
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: login }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router
