import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getRedLine } from '@/services/redLine'

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

  const sincronizarRecorrencia = () => {
    const { id } = uState.userData
    const { q, limit, offset } = store.filtroPlanejamentos
  }
  const salvarRecorrencia = () => {}
  const excluirRecorrencia = () => {}

  return { store, sincronizarRecorrencia, salvarRecorrencia, excluirRecorrencia }
})
