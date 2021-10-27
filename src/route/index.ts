import { createRouter, createWebHistory } from 'vue-router'
import index from '../view/index.vue'
import text from '../view/text.vue'

const routes = [
	{
		path: '/',
		component: index
	},
	{
		path: '/text',
		component: text
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})
export default router
