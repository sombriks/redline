import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const AuthPage = () => import('@/pages/usuario/auth-page.vue')
const CategoriasPage = () => import('@/pages/categoria/categorias-page.vue')
const ConfigPage = () => import('@/pages/configuracao/config-page.vue')
const UserDetailsPage = () => import('@/pages/usuario/user-details.vue')
const ContasPage = () => import('@/pages/conta/contas-page.vue')
const DashboardPage = () => import('@/pages/dashboard/dashboard-page.vue')
const EditarMovimentacaoPage = () => import('@/pages/movimentacao/editar-movimentacao-page.vue')
const MovimentacaoPage = () => import('@/pages/movimentacao/movimentacao-page.vue')
const NovaMovimentacaoPage = () => import('@/pages/movimentacao/nova-movimentacao-page.vue')
const PagamentoPage = () => import('@/pages/pagamento/pagamento-page.vue')
const PlanejamentoPage = () => import('@/pages/planejamento/planejamento-page.vue')
const RecorrenciasPage = () => import('@/pages/recorrencia/recorrencias-page.vue')

export const routes = [
  { path: '/', redirect: '/dashboard' },
  { component: AuthPage, path: '/auth' },
  {
    component: DashboardPage,
    path: '/dashboard',
    meta: { label: 'Dashboard', icon: 'mdi-chart-bar' }
  },
  {
    component: NovaMovimentacaoPage,
    path: '/nova-movimentacao',
    meta: { label: 'Novo lançamento', icon: 'mdi-cash-plus' }
  },
  {
    component: MovimentacaoPage,
    path: '/historico',
    meta: {
      label: 'Lançamentos',
      icon: 'mdi-clipboard-text-search-outline'
    }
  },
  {
    component: PagamentoPage,
    path: '/pagamento',
    meta: {
      label: 'Pagar/Transferir',
      icon: 'mdi-cash-multiple'
    }
  },
  {
    component: ContasPage,
    path: '/contas',
    meta: {
      label: 'Contas',
      icon: 'mdi-card-account-details'
    }
  },
  {
    component: CategoriasPage,
    path: '/categorias',
    meta: {
      label: 'Categorias',
      icon: 'mdi-playlist-check'
    }
  },
  { component: EditarMovimentacaoPage, path: '/editar-movimentacao/:id' },
  {
    component: PlanejamentoPage,
    path: '/planejamento',
    meta: {
      label: 'Planejamento',
      icon: 'mdi-clipboard-edit-outline'
    }
  },
  {
    component: RecorrenciasPage,
    path: '/recorrencias',
    meta: {
      label: 'Recorrências',
      icon: 'mdi-history'
    }
  },
  {
    component: ConfigPage,
    path: '/config',
    meta: {
      label: 'Configurações',
      icon: 'mdi-cog-outline'
    }
  },
  { component: UserDetailsPage, path: '/user-details/:editToken' },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

const skips = ['/auth', '/user-details']

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (!userStore.store.token && !skips.includes(to.path)) {
    return { path: '/auth' }
  }
})
