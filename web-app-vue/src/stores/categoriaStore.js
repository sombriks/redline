import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getRedLine } from "@/services/redLine";
import { listCategorias } from "@/services/api";
import { useUserStore } from "@/stores/userStore";

export const useCategoriaStore = defineStore('categoria-store', () => {
  const uState = useUserStore()


  const store = reactive({
    categorias: getRedLine()?.categorias || []
  })

  const sincronizarCategorias = async () => {
    const {id} = uState.userData
    store.categorias = await listCategorias({id})
  }

  return { store, sincronizarCategorias }
})
