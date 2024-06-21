import { createRouter, createWebHistory } from 'vue-router'

import PostsArea from '../components/PostsArea/PostsArea.vue'
import LoginArea from '../components/LoginArea/LoginArea.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginArea },
    { path: '/', name: 'home', component: PostsArea }
  ]
})

export default router
