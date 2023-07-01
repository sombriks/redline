import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getRedLine } from "@/services/redLine";

export const useCategoriaStore = defineStore('categoria-store', () => {
  const store = reactive({
    categorias: getRedLine().categorias || []
  })

  return { store }
})
