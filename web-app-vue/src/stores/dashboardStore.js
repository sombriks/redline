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
      saldos: {
        anterior1Ano: 0,
        anterior1Mes: 0,
        anterior6Meses: 0,
        periodo: 0,
        projetado1Ano: 0,
        projetado1Mes: 0,
        projetado6Meses: 0
      },
      vencimentos: {
        a_vencer: 0,
        em_atraso: 0,
        quitadas: 0
      }
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
