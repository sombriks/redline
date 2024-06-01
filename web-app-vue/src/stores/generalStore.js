import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general-store', {
  state() {
    return { loading: false }
  },
  actions: {
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    }
  }
})
