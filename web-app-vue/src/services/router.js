import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AuthPage from '@/pages/usuario/auth-page.vue'
import NovaMovimentacaoPage from '@/pages/movimentacao/nova-movimentacao-page.vue'
import CategoriasPage from '@/pages/categoria/categorias-page.vue'
import ConfigPage from '@/pages/configuracao/config-page.vue'
// import DashboardPage from "@/pages/dashboard/dashboard-page.vue"
const DashboardPage = () => import("@/pages/dashboard/dashboard-page.vue")
import PlanejamentoPage from '@/pages/planejamento/planejamento-page.vue'
import RecorrenciasPage from '@/pages/recorrencia/recorrencias-page.vue'
import ContasPage from '@/pages/conta/contas-page.vue'
import HistoricoPage from '@/pages/movimentacao/historico-page.vue'
import EditarMovimentacaoPage from '@/pages/movimentacao/editar-movimentacao-page.vue'

export const routes = [
  { component: AuthPage, path: '/auth' },
  { path: '/', redirect: '/dashboard' },
  { component: DashboardPage, path: '/dashboard', label: 'Dashboard', icon: 'mdi-chart-bar' },
  { component: NovaMovimentacaoPage, path: '/nova-movimentacao', label: 'Novo lançamento', icon: 'mdi-currency-usd' },
  { component: ContasPage, path: '/contas', label: 'Contas', icon: 'mdi-card-account-details' },
  { component: CategoriasPage, path: '/categorias', label: 'Categorias', icon: 'mdi-playlist-check' },
  { component: HistoricoPage, path: '/historico', label: 'Histórico', icon: 'mdi-clipboard-text-search-outline' },
  { component: EditarMovimentacaoPage, path: '/editar-movimentacao/:id' },
  { component: PlanejamentoPage, path: '/planejamento', label: 'Planejamento', icon: 'mdi-clipboard-edit-outline' },
  { component: RecorrenciasPage, path: '/recorrencias', label: 'Recorrências', icon: 'mdi-history' },
  { component: ConfigPage, path: '/config', label: 'Configurações', icon: 'mdi-cog-outline' },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
})


router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (!userStore.store.token && to.path !== '/auth') {
    return { path: '/auth' }
  }
})
