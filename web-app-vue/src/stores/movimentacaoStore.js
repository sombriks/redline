import {defineStore} from 'pinia'
import {useUserStore} from '@/stores/userStore'
import {reactive} from 'vue'
import {getRedLine, setRedLine} from '@/services/redLine'
import {
  delMovimentacao,
  insertMovimentacao,
  lisTiposMovimentacao,
  listMovimentacoes,
  updateMovimentacao
} from '@/services/api'

export const useMovimentacaoStore = defineStore('movimentacao-store', () => {
  const uState = useUserStore()

  function initStore() {
    const redLine = getRedLine()
    return reactive({
      tiposMovimentacao: redLine?.tiposMovimentacao || [],
      movimentacoes: redLine?.movimentacoes || [],
      filtrosMovimentacao: redLine?.filtrosMovimentacao || {
        tipo_movimentacao_id: null,
        dataInicio: null,
        dataFim: null,
        offset: 0,
        limit: 50,
        id: null,
        q: ''
      }
    })
  }

  const store = initStore()

  const sincronizarMovimentacoes = async () => {
    const redLine = getRedLine()
    store.filtrosMovimentacao.id = uState.userData.id;
    store.tiposMovimentacao = await lisTiposMovimentacao()
    store.movimentacoes = await listMovimentacoes({...store.filtrosMovimentacao})
    setRedLine({
      ...redLine,
      tiposMovimentacao: store.tiposMovimentacao,
      movimentacoes: store.movimentacoes
    })
  }

  const salvarMovimentacao = async (movimentacao) => {
    const {id} = uState.userData
    const {conta_id} = movimentacao
    if (movimentacao.id) await updateMovimentacao({id, conta_id, movimentacao})
    else await insertMovimentacao({id, conta_id, movimentacao})
  }

  const excluirMovimentacao = async (movimentacao) => {
    const {id} = uState.userData
    const {conta_id} = movimentacao
    await delMovimentacao({id, conta_id, movimentacao})
  }

  const aplicarFiltro = filtro => {
    Object.assign(store.filtrosMovimentacao, filtro)
    const redLine = getRedLine()
    setRedLine({...redLine, ...store})
  }

  return {store, sincronizarMovimentacoes, salvarMovimentacao, excluirMovimentacao, aplicarFiltro}
})
