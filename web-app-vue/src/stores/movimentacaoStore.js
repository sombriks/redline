import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { reactive } from 'vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import { getRedLine, setRedLine } from '@/services/redLine'
import {
  delMovimentacao,
  insertMovimentacao,
  lisTiposMovimentacao,
  listMovimentacoes,
  savePagamento,
  saveTransferencia,
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
        efetivada: null,
        dataInicio: startOfMonth(new Date()),
        dataFim: endOfMonth(new Date()),
        offset: 0,
        limit: 10000,
        id: null,
        q: ''
      }
    })
  }

  const store = initStore()

  const sincronizarMovimentacoes = async () => {
    const redLine = getRedLine()
    store.filtrosMovimentacao.id = uState.userData.id
    store.tiposMovimentacao = await lisTiposMovimentacao()
    store.movimentacoes = await listMovimentacoes({ ...store.filtrosMovimentacao })
    setRedLine({
      ...redLine,
      tiposMovimentacao: store.tiposMovimentacao,
      movimentacoes: store.movimentacoes
    })
  }

  const doListMovimentacoes = async (filtro = store.filtrosMovimentacao) => {
    store.movimentacoes = await listMovimentacoes({ ...filtro })
  }

  const salvarMovimentacao = async (movimentacao) => {
    const { id } = uState.userData
    const { conta_id } = movimentacao
    if (movimentacao.id) await updateMovimentacao({ id, conta_id, movimentacao })
    else await insertMovimentacao({ id, conta_id, movimentacao })
  }

  const excluirMovimentacao = async (movimentacao) => {
    const { id } = uState.userData
    const { conta_id } = movimentacao
    await delMovimentacao({ id, conta_id, movimentacao })
  }

  const aplicarFiltro = (filtro) => {
    Object.assign(store.filtrosMovimentacao, filtro)
    const redLine = getRedLine()
    setRedLine({ ...redLine, ...store })
  }

  const getMovimentacao = (id) => store.movimentacoes?.find((m) => m.id == id)

  const transferir = async ({ contaOrigem, contaDestino, categoria, valor, vencimento }) => {
    const { id } = uState.userData
    await saveTransferencia({ id, contaOrigem, contaDestino, categoria, valor, vencimento })
    await sincronizarMovimentacoes()
  }

  const pagar = async ({
    conta_destino_id,
    movimentacoes_id,
    categoria_id,
    vencimento,
    conta_id,
    valor
  }) => {
    const { id } = uState.userData
    await savePagamento({
      conta_destino_id,
      movimentacoes_id,
      categoria_id,
      vencimento,
      conta_id,
      valor,
      id
    })
    await sincronizarMovimentacoes()
  }

  return {
    sincronizarMovimentacoes,
    doListMovimentacoes,
    excluirMovimentacao,
    salvarMovimentacao,
    getMovimentacao,
    aplicarFiltro,
    transferir,
    pagar,
    store
  }
})
