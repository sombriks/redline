import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getRedLine, setRedLine } from '@/services/redLine'
import { useUserStore } from '@/stores/userStore'
import { deleteConta, insertConta, listContas, listTiposConta, updateConta } from '@/services/api'

export const useContaStore = defineStore('conta-store', () => {
  const uState = useUserStore()

  function initStore() {
    const redLine = getRedLine()
    return reactive({
      contas: redLine?.contas || [],
      tiposConta: redLine?.tiposConta || []
    })
  }

  const store = initStore()

  const sincronizarContas = async () => {
    const redLine = getRedLine()
    const { id } = uState.userData
    const contas = await listContas({ id })
    const tiposConta = await listTiposConta()
    store.contas = contas
    store.tiposConta = tiposConta
    setRedLine({ ...redLine, contas, tiposConta })
  }

  const salvarConta = async (conta) => {
    const { id } = uState.userData
    conta.usuario_id = id
    if (conta.id) {
      await updateConta({ id, conta })
    } else {
      await insertConta({ id, novaConta: conta })
    }
  }

  const removeConta = async (conta) => {
    const { id } = uState.userData
    await deleteConta({ id, conta })
  }

  return { store, sincronizarContas, salvarConta, removeConta }
})
