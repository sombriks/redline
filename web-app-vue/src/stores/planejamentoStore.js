import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { getRedLine } from '@/services/redLine'
import {delPlanejamento, listPlanejamentos} from "@/services/api";

export const usePlanejamentoStore = defineStore('planejamento-store', () => {
  const uState = useUserStore()

  const store = reactive({
    planejamentos: getRedLine()?.planejamentos || [],
    filtroPlanejamentos: getRedLine()?.filtroPlanejamentos || {
      q: '',
      limit: 100,
      offset: 0
    }
  })

  const sincronizarPlanejamentos = async () => {
    const { id } = uState.userData
    const { q, limit, offset } = store.filtroPlanejamentos
    store.planejamentos = await listPlanejamentos({ id, q, limit, offset })
    // store.planejamentos =
  }

  const excluirPlanejamento = async planejamento_id => {
    const { id } = uState.userData
    await delPlanejamento({id, planejamento_id})
  }

  return {
    store,
    sincronizarPlanejamentos,
    excluirPlanejamento
  }
})
