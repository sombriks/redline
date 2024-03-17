import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getRedLine } from '@/services/redLine'
import {
  delRecorrencia,
  insertRecorrencia,
  listRecorrencias,
  updateRecorrencia
} from '@/services/api'

export const useRecorrenciaStore = defineStore('recorrencia-store', () => {
  const uState = useUserStore()

  const store = reactive({
    recorrencias: getRedLine()?.recorrencias || [],
    filtroRecorrencias: getRedLine()?.filtroRecorrencias || {
      q: '',
      limit: 100,
      offset: 0
    }
  })

  const sincronizarRecorrencia = async () => {
    console.log("aqui")
    const { id } = uState.userData
    const { q, limit, offset } = store.filtroRecorrencias
    store.recorrencias = await listRecorrencias({ id, q, limit, offset })
  }
  const salvarRecorrencia = async (recorrencia) => {
    const { id } = uState.userData
    if (recorrencia.id) {
      await updateRecorrencia({ id, recorrencia })
    } else {
      await insertRecorrencia({ id, recorrencia })
    }
    await sincronizarRecorrencia()
  }
  const excluirRecorrencia = async (recorrencia_id) => {
    const { id } = uState.userData
    await delRecorrencia({ id, recorrencia_id })
    await sincronizarRecorrencia()
  }

  return { store, sincronizarRecorrencia, salvarRecorrencia, excluirRecorrencia }
})
