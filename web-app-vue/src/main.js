import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './services/router'

import { vuetifyInstance } from "@/ui/vuetifyInstance";

import App from './App.vue'

import './assets/main.css'

export const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetifyInstance)

app.mount('#app')
