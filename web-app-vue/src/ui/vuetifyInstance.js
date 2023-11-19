import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
// import { VDatePicker } from 'vuetify/labs/VDatePicker'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export const vuetifyInstance = createVuetify({
  // components: {
  //   VDatePicker,
  // },
  theme: { defaultTheme: 'dark' },
  blueprint: md3,
  defaults: {
    global: {

    }
  }
})
