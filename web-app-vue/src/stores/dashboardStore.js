import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { getRedLine } from '@/services/redLine'

export const useDashboardStore = defineStore('dashboard-store', () => {
  const uState = useUserStore()

  const store = reactive({
    dashboard: getRedLine()?.dashboard || {
      receitaDespesaPeriodo: [ // Receita x Despesa
        { label: 'Receita', value: 18000, color: 'lightgreen' },
        { label: 'Despesa', value: 14500, color: 'red' }
      ],
      despesaConta: [ // Despesas por conta
        { label: 'Banco', value: 5800.55, color: 'lightyellow' },
        { label: 'Cartão', value: 2600.02, color: 'orange' },
        { label: 'Carteira', value: 1500, color: 'darkgreen' }
      ],
      despesaCategoria: [ // Despesas por categoria
        { label: 'Moradia', value: 4000, color: 'gray' },
        { label: 'Alimentação', value: 5000, color: 'red' },
        { label: 'Internet', value: 600, color: 'green' },
        { label: 'Empréstimos', value: 3000, color: 'brown' },
        { label: 'Transporte', value: 1500, color: 'blue' }
      ],
      despesaDia: [ // Despesas por dia

      ],
      receitaConta: [],
      receitaCategoria: [],
      receitaDia: [],
      saldos: {
        anteriorPeriodo: 0,
        periodo: 0,
        projetado1Mes: 0,
        projetado6Meses: 0,
        projetado1Ano: 0
      }
    }
  })

  const sincronizarDashboard = async () => {
    const { id } = uState.store.userData
    console.log(id)
  }

  return { store, sincronizarDashboard }
})
