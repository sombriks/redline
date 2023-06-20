import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getRedLine, setRedLine } from '@/services/redLine'
import { useUserStore } from '@/stores/userStore'
import { insertConta, listContas, listTiposConta, updateConta } from '@/services/api'

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
    const contas = await listContas({ id: uState.userData.id })
    const tiposConta = await listTiposConta()
    store.contas = contas
    store.tiposConta = tiposConta
    setRedLine({ ...redLine, contas, tiposConta })
  }

  const salvarConta = async (conta) => {
    console.log(conta)
    const { id } = uState.userData
    conta.tipo_conta_id = 1 // TODO
    conta.usuario_id = id
    if (conta.id) {
      await updateConta({ id, conta })
    } else {
      await insertConta({ id, novaConta: conta })
    }
  }

  return { store, sincronizarContas, salvarConta }
})
