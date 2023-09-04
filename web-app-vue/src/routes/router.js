import { createRouter, createWebHashHistory } from 'vue-router'
import AuthPage from '@/pages/auth-page.vue'
import NovaMovimentacaoPage from '@/pages/nova-movimentacao-page.vue'
import CategoriasPage from '@/pages/categorias-page.vue'
import ConfigPage from '@/pages/config-page.vue'
import PlanejamentoPage from '@/pages/planejamento-page.vue'
import RecorrenciasPage from '@/pages/recorrencias-page.vue'
import ContasPage from '@/pages/contas-page.vue'
import MovimentacoesPage from '@/pages/movimentacoes-page.vue'

const routes = [
  { path: '/', redirect: '/nova-movimentacao' },
  { component: AuthPage, path: '/auth' },
  { component: CategoriasPage, path: '/categorias' },
  { component: ConfigPage, path: '/config' },
  { component: ContasPage, path: '/contas' },
  { component: MovimentacoesPage, path: '/movimentacoes' },
  { component: NovaMovimentacaoPage, path: '/nova-movimentacao' },
  { component: PlanejamentoPage, path: '/planejamento' },
  { component: RecorrenciasPage, path: '/recorrencias' }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

const isAuthenticated = false // TODO check token

router.beforeEach(async (to) => {
  if (!isAuthenticated && to.path !== '/auth') {
    return { path: '/auth' }
  }
})
