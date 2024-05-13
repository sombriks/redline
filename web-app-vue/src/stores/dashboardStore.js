import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { getRedLine } from '@/services/redLine'
import { getDashboard } from '@/services/api'

export const useDashboardStore = defineStore('dashboard-store', () => {
  const uState = useUserStore()

  const store = reactive({
    dashboard: getRedLine()?.dashboard || {
      receitaDespesaTotalPeriodo: [
        // Receita x Despesa - simple-bar
        { label: 'Receita Total', value: 18000, color: 'lightgreen' },
        { label: 'Despesa Total', value: 14500, color: 'red' }
      ],
      receitaDespesaEfetivadaPeriodo: [
        // Receita x Despesa - simple-bar
        { label: 'Receita Efetivada', value: 18000, color: 'lightgreen' },
        { label: 'Despesa Efetivada', value: 1500, color: 'red' }
      ],
      despesaConta: [
        // Despesas por conta - pie
        { label: 'Banco', value: 5800.55, color: 'lightyellow' },
        { label: 'Cartão', value: 2600.02, color: 'orange' },
        { label: 'Carteira', value: 1500, color: 'darkgreen' }
      ],
      despesaCategoria: [
        // Despesas por categoria - pie
        { label: 'Moradia', value: 4000, color: 'gray' },
        { label: 'Alimentação', value: 5000, color: 'red' },
        { label: 'Internet', value: 600, color: 'green' },
        { label: 'Empréstimos', value: 3000, color: 'brown' },
        { label: 'Transporte', value: 1500, color: 'blue' }
      ],
      receitaConta: [
        // Receitas por conta
        { label: 'Banco', value: 18000, color: 'lightyellow' }
      ],
      receitaCategoria: [
        // Receitas categoria
        { label: 'Salário', value: 18000, color: 'lightgreen' }
      ],
      composicaoDespesas: [
        {
          label: 'Banco',
          color: 'red',
          data: [
            { label: 'Moradia', value: 4000, color: 'gray' },
            { label: 'Internet', value: 600, color: 'green' }
          ]
        },
        {
          label: 'Cartão',
          color: 'cyan',
          data: [{ label: 'Empréstimos', value: 3000, color: 'brown' }]
        },
        {
          label: 'Carteira',
          color: 'violet',
          data: [
            { label: 'Transporte', value: 1500, color: 'blue' },
            { label: 'Alimentação', value: 5000, color: 'red' },
            { label: 'Outros', value: 700, color: 'blue' }
          ]
        }
      ],
      composicaoReceitas: [
        {
          label: 'Conta 1',
          color: 'lightblue',
          data: [{ label: 'Salário', value: 18000, color: 'lightgreen' }]
        }
      ],
      saldos: {
        // Saldos relativos ao período
        anteriorGeral: 0,
        anterior1Ano: -10,
        anterior6Meses: 0,
        anterior1Mes: 0,
        periodo: 0,
        projetado1Mes: 0,
        projetado6Meses: 10,
        projetado1Ano: 0
      },
      vencimentos: {
        quitadas: 7,
        aVencer: 3,
        emAtraso: 0
      },
      limites: [],
      planejamentos: []
    }
  })

  const sincronizarDashboard = async (inicio, fim) => {
    const { id } = uState.userData
    const result =  await getDashboard({ id, inicio, fim })
    store.dashboard = result
    console.log(id, inicio, fim)
  }

  return { store, sincronizarDashboard }
})
