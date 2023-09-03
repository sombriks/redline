import { createRouter, createWebHashHistory } from 'vue-router'
import AuthPage from '@/pages/auth-page.vue'
import MovimentacaoPage from '@/pages/movimentacao-page.vue'

const routes = [
  { component: AuthPage, path: '/auth' },
  { component: MovimentacaoPage, path: '/movimentacao' },
  { path: '/', redirect: '/movimentacao' }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

const isAuthenticated = false // TODO check token

router.beforeEach(async (to, from) => {
  if (!isAuthenticated && to.path !== '/auth') {
    return { path: '/auth' }
  }
})
