import { createRouter, createWebHistory } from 'vue-router'

import RegistrationArea from '../components/RegistrationArea/RegistrationArea.vue'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.vue'
import PostsArea from '../components/PostsArea/PostsArea.vue'
import LoginArea from '../components/LoginArea/LoginArea.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/register', name: 'register', component: RegistrationArea },
    { path: '/login', name: 'login', component: LoginArea },
    { path: '/', name: 'home', component: PostsArea }
  ]
})

export default router
