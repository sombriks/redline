<template>
  <v-container fluid>
    <v-row>
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
              height="6vh"
              :data="dashboardState.store.dashboard.receitaDespesaTotalPeriodo"
            ></simple-bar-chart>
            <v-divider></v-divider>
            <simple-bar-chart
              title="Receitas x Despesas efetivadas do período"
              height="6vh"
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
            <stack-bar-chart title="Composição de despesas"></stack-bar-chart>
            <v-divider></v-divider>
            <stack-bar-chart title="Composição de receitas"></stack-bar-chart>
            <v-divider></v-divider>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="saldos">
          <!-- saldos (tabelinha/hero cards)-->
          <!--    anterior geral-->
          <!--    anterior 1 ano-->
          <!--    anterior 6 meses-->
          <!--    anterior 1 mês-->
          <!--    período selecionado-->
          <!--    projetado 1 mês-->
          <!--    projetado 6 meses-->
          <!--    projetado 1 ano-->
          <v-expansion-panel-title>Saldos</v-expansion-panel-title>
          <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="vencimentos">
          <!-- quantidade de contas vencidas (hero cards)-->
          <!-- quantidade de contas a vencer (hero cards)-->
          <v-expansion-panel-title>Vencimentos</v-expansion-panel-title>
          <v-expansion-panel-text></v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="limites">
          <!-- limites por conta banco (stacked-bar?) -->
          <!-- limites por conta cartão (stacked-bar?) -->
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

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const folha = ref("rxd")

const dashboardState = useDashboardStore()

onMounted(async () => {
  await dashboardState.sincronizarDashboard(inicio.value, fim.value)
})
</script>
