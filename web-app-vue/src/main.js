import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './routes/router'

import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
