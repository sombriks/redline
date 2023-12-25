import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export const vuetifyInstance = createVuetify({
  theme: { defaultTheme: 'dark' },
  blueprint: md3,
  defaults: {
    global: {}
  }
})
