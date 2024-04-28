<template>
  <v-container fluid>
    <!-- filtro período -->
    <v-row align="center">
      <h1>Dashboard</h1>
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <!-- receitas x despesas totais (simple-bar) -->
    <v-row align="center">
      <simple-bar-chart
        title="Receitas x Despesas totais do período"
        height="6vh"
        :data="dashboardState.store.dashboard.receitaDespesaTotalPeriodo"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- receitas x despesas efetivadas (simple-bar) -->
    <v-row align="center">
      <simple-bar-chart
        title="Receitas x Despesas efetivadas do período"
        height="6vh"
        :data="dashboardState.store.dashboard.receitaDespesaEfetivadaPeriodo"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- despesas por conta (pizza) -->
    <v-row align="center">
      <pie-chart
        title="Despesas do período por conta"
        height="20vh"
        :data="dashboardState.store.dashboard.despesaConta"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- despesas por categoria (pizza) -->
    <v-row align="center">
      <pie-chart
        title="Despesas do período por categoria"
        height="20vh"
        :data="dashboardState.store.dashboard.despesaCategoria"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- receitas por conta (pizza) -->
    <v-row align="center">
      <pie-chart
        title="Receitas do período por conta"
        height="20vh"
        :data="dashboardState.store.dashboard.receitaConta"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- receitas por categoria (pizza) -->
    <v-row align="center">
      <pie-chart
        title="Receitas do período por categoria"
        height="20vh"
        :data="dashboardState.store.dashboard.receitaCategoria"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <!-- limites por conta banco (stacked-bar) -->
    <!-- limites por conta cartão (stacked-bar) -->
    <!-- saldos (tabelinha/hero cards)-->
    <!--    anterior geral-->
    <!--    anterior 1 ano-->
    <!--    anterior 6 meses-->
    <!--    anterior 1 mês-->
    <!--    período selecionado-->
    <!--    projetado 1 mês-->
    <!--    projetado 6 meses-->
    <!--    projetado 1 ano-->
    <!-- composição despesas (stacked bar conta/categorias)-->
    <!-- composição receitas (stacked bar conta/categorias)-->
    <!-- quantidade de contas vencidas (hero cards)-->
    <!-- quantidade de contas a vencer (hero cards)-->
    <!-- situação dos planejamentos (linhas no plano com a REDLINE do planejamento)-->
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

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const dashboardState = useDashboardStore()

onMounted(async () => {
  await dashboardState.sincronizarDashboard(inicio.value, fim.value)
})
</script>
