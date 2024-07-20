import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { clearRedLine, getRedLine, setRedLine } from '@/services/redLine'
import { createUser, login, removeAccount } from '@/services/api'

export const useUserStore = defineStore('user-store', () => {
  const store = reactive({
    token: getRedLine()?.token
  })

  const userData = computed(() => store.token && jwtDecode(store.token) || {})

  const setToken = (_token) => {
    let redLine = getRedLine()
    store.token = _token
    redLine.token = _token
    setRedLine(redLine)
  }

  const doCreateUser = ({ nome, email, senha, invite }) =>
    createUser({ nome, email, senha, invite })

  const doLogin = ({ email, senha }) => login({ email, senha })

  const logout = async () => {
    store.token = null
    clearRedLine()
  }

  const deleteAccount = async ({ email, senha }) => {
    await removeAccount({ id: userData.value.id, email, senha })
    await logout()
  }

  return { store, userData, setToken, doLogin, doCreateUser, logout, deleteAccount }
})
