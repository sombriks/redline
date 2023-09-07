import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

import { router } from './routes/router'

import App from './App.vue'

import './assets/main.css'

const vuetify = createVuetify({
  theme: { defaultTheme: 'dark' },
  blueprint: md3,
  defaults: {
    global: {
      variant: 'outlined'
    }
  }
})

export const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
