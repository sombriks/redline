import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'
import { clearRedLine, getRedLine, setRedLine } from '@/services/redLine'
import { createUser, login, removeAccount } from '@/services/api'

export const useUserStore = defineStore('user-store', () => {
  const store = reactive({
    token: getRedLine()?.token
  })

  const userData = computed(() => store.token && jwt_decode(store.token) || {})

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
    const  router  = useRouter()
    store.token = null
    clearRedLine()
    router.push('/auth')
  }

  const deleteAccount = async ({ email, senha }) => {
    await removeAccount({ id: userData.value.id, email, senha })
    await logout()
  }

  return { store, userData, setToken, doLogin, doCreateUser, logout, deleteAccount }
})
