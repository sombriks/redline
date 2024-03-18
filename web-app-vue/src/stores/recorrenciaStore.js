import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import {getRedLine, setRedLine} from '@/services/redLine'
import {
  delRecorrencia,
  insertRecorrencia,
  listRecorrencias,
  listTiposRecorrencia,
  updateRecorrencia
} from '@/services/api'

export const useRecorrenciaStore = defineStore('recorrencia-store', () => {
  const uState = useUserStore()

  const store = reactive({
    recorrencias: getRedLine()?.recorrencias || [],
    tiposRecorrencia: getRedLine()?.tiposRecorrencia || [],
    filtroRecorrencias: getRedLine()?.filtroRecorrencias || {
      q: '',
      limit: 100,
      offset: 0
    }
  })

  const sincronizarRecorrencia = async () => {
    const redLine = getRedLine()
    const { id } = uState.userData
    const { q, limit, offset } = store.filtroRecorrencias
    const [recorrencias, tiposRecorrencia] = await await Promise.all([
      listRecorrencias({ id, q, limit, offset }),
      listTiposRecorrencia()
    ])
    store.recorrencias = recorrencias
    store.tiposRecorrencia = tiposRecorrencia
    setRedLine({ ...redLine, recorrencias, tiposRecorrencia })
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
