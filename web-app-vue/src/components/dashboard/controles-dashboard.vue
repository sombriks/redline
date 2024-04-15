<template>
  <v-container fluid>
    <v-row align="center">
      <h1>Dashboard</h1>
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row align="center">
      <comparison-bar-chart
        title="Receita x Despesa do período"
        height="4vh"
        :data="[
          { label: 'Receita', value: dashboard.receitaPeriodo, color: 'lightgreen' },
          { label: 'Despesa', value: dashboard.despesaPeriodo, color: 'red' }
        ]"
        label1="Receita"
        label2="Despesa"
        :value1="dashboard.receitaPeriodo"
        :value2="dashboard.despesaPeriodo"
        color1="lightgreen"
        color2="red"
      ></comparison-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart title="Despesas do período por conta" height="20vh"></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart title="Despesas do período por categoria" height="20vh"></pie-chart>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import { endOfMonth, startOfMonth } from 'date-fns'
import { computed, reactive, ref } from 'vue'
import ChipPeriodo from '@/shared/chip-periodo.vue'
import ComparisonBarChart from '@/shared/charts/comparison-bar-chart.vue'
import PieChart from '@/shared/charts/pie-chart.vue'

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const dashboard = reactive({
  receitaAcumulada: -100,
  receitaPeriodo: 300,
  despesaAcumulada: -100,
  despesaPeriodo: 370
})
</script>
