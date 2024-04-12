<template>
  <v-container fluid>
    <v-row align="center">
      <h1>Dashboard</h1>
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
      <v-btn
        variant="outlined"
        rounded="rounded-circle"
        @click="drawer = !drawer"
        icon="mdi-dots-vertical"
      ></v-btn>
    </v-row>
    <v-row align="center">
      <bar-chart
        title="Receita x Despesa do período"
        label1="Receita"
        label2="Despesa"
        :value1="dashboard.receitaPeriodo"
        :value2="dashboard.despesaPeriodo"
        color1="lightgreen"
        color2="red"
        height="4vh"
      ></bar-chart>
      <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <conta-autocomplete v-model="contaId"></conta-autocomplete>
        <categoria-autocomplete v-model="categoriaId"></categoria-autocomplete>
      </v-navigation-drawer>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import ChipPeriodo from '@/shared/chip-periodo.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import { computed, reactive, ref } from 'vue'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'
import BarChart from '@/shared/charts/bar-chart.vue'

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const drawer = ref(false)

const contaId = ref()
const categoriaId = ref()

const dashboard = reactive({
  receitaAcumulada: -100,
  receitaPeriodo: 300,
  despesaAcumulada: -100,
  despesaPeriodo: 370
})

const redline = computed(() => dashboard.receitaPeriodo - dashboard.despesaPeriodo)
</script>
