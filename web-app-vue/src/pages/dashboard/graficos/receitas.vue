<template>
  <h3>Receitas por conta</h3>
  <VueUiDonut :config="donutConfig" :dataset="receitaConta"></VueUiDonut>
  <br />
  <v-divider></v-divider>
  <br />
  <h3>Receitas por categoria</h3>
  <VueUiDonut :config="donutConfig" :dataset="receitaCategoria"></VueUiDonut>
</template>
<script setup>
import { VueUiDonut } from 'vue-data-ui'
import { donutConfig } from '@/services/chart-config'
import { useDashboardStore } from '@/stores/dashboardStore'
import { computed } from 'vue'

const dashboardState = useDashboardStore()

const receitaConta = computed(() => {
  return dashboardState.store.dashboard?.receitaConta?.map((r) => ({
    ...r,
    name: `${r.label}`,
    values: [parseFloat(r.value)]
  }))
})

const receitaCategoria = computed(() => {
  return dashboardState.store.dashboard?.receitaCategoria?.map((r) => ({
    ...r,
    name: `${r.label}`,
    values: [parseFloat(r.value)]
  }))
})
</script>
