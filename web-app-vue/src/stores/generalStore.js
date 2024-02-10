import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general-store', {
  state() {
    return { loading: false }
  }
})
