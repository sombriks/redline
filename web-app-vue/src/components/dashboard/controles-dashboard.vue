<template>
  <v-container fluid>
    <v-row align="center">
      <h1>Dashboard</h1>
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row align="center">
      <simple-bar-chart
        title="Receitas x Despesas totais do período"
        height="6vh"
        :data="dashboardState.store.dashboard.receitaDespesaTotalPeriodo"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <simple-bar-chart
        title="Receitas x Despesas efetivadas do período"
        height="6vh"
        :data="dashboardState.store.dashboard.receitaDespesaEfetivadaPeriodo"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart
        title="Despesas do período por conta"
        height="20vh"
        :data="dashboardState.store.dashboard.despesaConta"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart
        title="Despesas do período por categoria"
        height="20vh"
        :data="dashboardState.store.dashboard.despesaCategoria"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart
        title="Receitas do período por conta"
        height="20vh"
        :data="dashboardState.store.dashboard.receitaConta"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart
        title="Receitas do período por categoria"
        height="20vh"
        :data="dashboardState.store.dashboard.receitaCategoria"
      ></pie-chart>
      <v-divider></v-divider>
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

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const dashboardState = useDashboardStore()

onMounted(async () => {
  await dashboardState.sincronizarDashboard(inicio.value, fim.value)
})
</script>
