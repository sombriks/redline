import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { getRedLine } from '@/services/redLine'
import { getDashboard } from '@/services/api'

export const useDashboardStore = defineStore('dashboard-store', () => {
  const uState = useUserStore()

  const store = reactive({
    dashboard: getRedLine()?.dashboard || {
      composicaoDespesas: [],
      composicaoReceitas: [],
      despesaCategoria: [],
      receitaCategoria: [],
      despesaConta: [],
      receitaConta: [],
      limites: [],
      receitaDespesaTotalPeriodo: [],
      receitaDespesaEfetivadaPeriodo: [],
      saldos: {},
      vencimentos: {}
    }
  })

  const sincronizarDashboard = async (inicio, fim) => {
    const { id } = uState.userData
    const result = await getDashboard({ id, inicio, fim })
    console.log(result)
    store.dashboard = result
  }

  return { store, sincronizarDashboard }
})
