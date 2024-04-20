<template>
  <v-container fluid>
    <v-row align="center">
      <h1>Dashboard</h1>
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row align="center">
      <simple-bar-chart
        title="Receita x Despesa do período"
        height="6vh"
        :data="[
          { label: 'Receita', value: dashboard.receitaPeriodo, color: 'lightgreen' },
          { label: 'Despesa', value: dashboard.despesaPeriodo, color: 'red' }
        ]"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <pie-chart
        title="Despesas do período por conta"
        height="20vh"
        :data="[
          { label: 'Carteira', value: 1500, color: 'darkgreen' },
          { label: 'Banco', value: 5800.55, color: 'lightyellow' },
          { label: 'Cartão', value: 2600.02, color: 'orange' }
        ]"
      ></pie-chart>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <simple-bar-chart
        title="Despesas do período por categoria"
        height="10vh"
        :data="[
          { label: 'Moradia', value: 4000, color: 'gray' },
          { label: 'Alimentação', value: 5000, color: 'red' },
          { label: 'Internet', value: 600, color: 'green' },
          { label: 'Empréstimos', value: 3000, color: 'brown' },
          { label: 'Transporte', value: 1500, color: 'blue' }
        ]"
      ></simple-bar-chart>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import { endOfMonth, startOfMonth } from 'date-fns'
import { reactive, ref } from 'vue'
import ChipPeriodo from '@/shared/chip-periodo.vue'
import SimpleBarChart from '@/shared/charts/simple-bar-chart.vue'
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
