import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)

app.mount('#app')
