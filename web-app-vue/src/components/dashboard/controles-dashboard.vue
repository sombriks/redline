<template>
  <v-container fluid>
    <v-row>
      <h1>Dashboard</h1>
      <!-- filtro período -->
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row>
      <v-expansion-panels v-model="folha" variant="accordion">
        <v-expansion-panel value="rxd">
          <!-- receitas x despesas totais (simple-bar) -->
          <!-- receitas x despesas efetivadas (simple-bar) -->
          <v-expansion-panel-title>Receitas x Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <simple-bar-chart
              title="Receitas x Despesas totais do período"
              :data="dashboardState.store.dashboard.receitaDespesaTotalPeriodo"
            ></simple-bar-chart>
            <v-divider></v-divider>
            <simple-bar-chart
              title="Receitas x Despesas efetivadas do período"
              :data="dashboardState.store.dashboard.receitaDespesaEfetivadaPeriodo"
            ></simple-bar-chart>
            <v-divider></v-divider>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="despesas">
          <!-- despesas por conta (pizza) -->
          <!-- despesas por categoria (pizza) -->
          <v-expansion-panel-title>Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <pie-chart
              title="Despesas do período por conta"
              height="20vh"
              :data="dashboardState.store.dashboard.despesaConta"
            ></pie-chart>
            <v-divider></v-divider>
            <pie-chart
              title="Despesas do período por categoria"
              height="20vh"
              :data="dashboardState.store.dashboard.despesaCategoria"
            ></pie-chart>
            <v-divider></v-divider>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="receitas">
          <!-- receitas por conta (pizza) -->
          <!-- receitas por categoria (pizza) -->
          <v-expansion-panel-title>Receitas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <pie-chart
              title="Receitas do período por conta"
              height="20vh"
              :data="dashboardState.store.dashboard.receitaConta"
            ></pie-chart>
            <v-divider></v-divider>
            <pie-chart
              title="Receitas do período por categoria"
              height="20vh"
              :data="dashboardState.store.dashboard.receitaCategoria"
            ></pie-chart>
            <v-divider></v-divider>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="comps">
          <!-- composição despesas (stacked bar conta/categorias)-->
          <!-- composição receitas (stacked bar conta/categorias)-->
          <v-expansion-panel-title>Composição</v-expansion-panel-title>
          <v-expansion-panel-text>
            <stack-bar-chart
              title="Composição de despesas"
              :groups="dashboardState.store.dashboard.composicaoDespesas"
            ></stack-bar-chart>
            <v-divider></v-divider>
            <stack-bar-chart
              title="Composição de receitas"
              :groups="dashboardState.store.dashboard.composicaoReceitas"
            ></stack-bar-chart>
            <v-divider></v-divider>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="saldos">
          <!-- saldos (tabelinha/chips)-->
          <!--    anterior geral-->
          <!--    anterior 1 ano-->
          <!--    anterior 6 meses-->
          <!--    anterior 1 mês-->
          <!--    período selecionado-->
          <!--    projetado 1 mês-->
          <!--    projetado 6 meses-->
          <!--    projetado 1 ano-->
          <v-expansion-panel-title>Saldos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <chip-saldo
              label="Saldo anterior geral:"
              :saldo="dashboardState.store.dashboard.saldos.anteriorGeral"
            />
            <chip-saldo
              label="Saldo ano anterior:"
              :saldo="dashboardState.store.dashboard.saldos.anterior1Ano"
            />
            <chip-saldo
              label="Saldo últimos 6 meses:"
              :saldo="dashboardState.store.dashboard.saldos.anterior6Meses"
            />
            <chip-saldo
              label="Saldo mês anterior:"
              :saldo="dashboardState.store.dashboard.saldos.anterior1Mes"
            />
            <v-divider></v-divider>
            <chip-saldo
              label="Saldo do período:"
              :saldo="dashboardState.store.dashboard.saldos.periodo"
            />
            <v-divider></v-divider>
            <chip-saldo
              label="Saldo projetado - 1 mês:"
              :saldo="dashboardState.store.dashboard.saldos.projetado1Mes"
            />
            <chip-saldo
              label="Saldo projetado - 6 meses:"
              :saldo="dashboardState.store.dashboard.saldos.projetado6Meses"
            />
            <chip-saldo
              label="Saldo projetado - 1 ano:"
              :saldo="dashboardState.store.dashboard.saldos.projetado1Ano"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="vencimentos">
          <!-- quantidade de contas vencidas (chips)-->
          <!-- quantidade de contas a vencer (chips)-->
          <v-expansion-panel-title>Vencimentos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-chip variant="outlined" class="ma-1" rounded size="large" color="cyan">
              A vencer: {{ dashboardState.store.dashboard.vencimentos.aVencer }}
            </v-chip>
            <v-chip variant="outlined" class="ma-1" rounded size="large" color="orange">
              Em atraso: {{ dashboardState.store.dashboard.vencimentos.emAtraso }}
            </v-chip>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="limites">
          <!-- limites por conta banco -->
          <!-- limites por conta cartão -->
          <!-- situação dos planejamentos (linhas no plano com a REDLINE do limite da conta / cartão)-->
          <v-expansion-panel-title>Limites</v-expansion-panel-title>
          <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="planejamentos">
          <!-- situação dos planejamentos (linhas no plano com a REDLINE do planejamento)-->
          <v-expansion-panel-title>Planejamentos</v-expansion-panel-title>
          <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import { endOfMonth, startOfMonth } from 'date-fns'
import { onMounted, ref } from 'vue'
import ChipPeriodo from '@/shared/chip-periodo.vue'
import SimpleBarChart from '@/shared/charts/simple-bar-chart.vue'
import PieChart from '@/shared/charts/pie-chart.vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import StackBarChart from '@/shared/charts/stack-bar-chart.vue'
import ChipSaldo from '@/shared/chip-saldo.vue'

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const folha = ref('rxd')

const dashboardState = useDashboardStore()

onMounted(async () => {
  await dashboardState.sincronizarDashboard(inicio.value, fim.value)
})
</script>
