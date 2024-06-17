/* eslint-disable no-undef */

import { describe, beforeEach, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

global.ResizeObserver = require('resize-observer-polyfill')

import CardLogin from './card-login.vue'

const vuetify = createVuetify({
  components,
  directives
})
describe('Módulo de usuários', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('monta o componente de login ', () => {
    const wrapper = mount(
      {
        template: '<v-layout><CardLogin></CardLogin></v-layout>'
      },
      { props:{}, global: { components: { CardLogin }, plugins: [vuetify] } }
    )
    expect(wrapper.text()).toContain('Email')
    wrapper.find("button[aria-roledescription='create-mode']").trigger('click', () => {
      expect(wrapper.text()).toContain('Nome')
    })
  })
})
