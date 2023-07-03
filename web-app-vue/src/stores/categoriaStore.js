import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getRedLine, setRedLine } from '@/services/redLine'
import { delCategoria, insertCategoria, listCategorias, updateCategoria } from '@/services/api'
import { useUserStore } from '@/stores/userStore'

export const useCategoriaStore = defineStore('categoria-store', () => {
  const uState = useUserStore()

  const store = reactive({
    categorias: getRedLine()?.categorias || []
  })

  const sincronizarCategorias = async () => {
    const { id } = uState.userData
    const categorias = await listCategorias({ id })
    store.categorias = categorias
    setRedLine({ ...getRedLine(), categorias })
  }

  const salvarCategoria = async (categoria) => {
    const { id } = uState.userData
    categoria.usuario_id = id
    if (categoria.id) {
      await updateCategoria({ id, categoria })
    } else {
      await insertCategoria({ id, categoria })
    }
  }

  const excluirCategoria = async (categoria) => {
    const { id } = uState.userData
    categoria.usuario_id = id
    await delCategoria({ id, categoria })
  }

  return { store, sincronizarCategorias, salvarCategoria, excluirCategoria }
})
