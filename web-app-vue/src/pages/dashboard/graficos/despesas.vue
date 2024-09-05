<template>
  <h3>Despesas por conta</h3>
  <VueUiDonut :config="donutConfig" :dataset="despesaConta"></VueUiDonut>
  <br />
  <v-divider></v-divider>
  <br />
  <h3>Despesas por categoria</h3>
  <VueUiDonut :config="donutConfig" :dataset="despesaCategoria"></VueUiDonut>
</template>
<script setup>
import { computed } from 'vue'
import { VueUiDonut } from 'vue-data-ui'
import { donutConfig } from '@/services/chart-config'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()

const despesaConta = computed(() => {
  return dashboardState.store.dashboard?.despesaConta?.map((r) => ({
    ...r,
    name: `${r.label}`,
    values: [parseFloat(r.value)]
  }))
})

const despesaCategoria = computed(() => {
  return dashboardState.store.dashboard?.despesaCategoria?.map((r) => ({
    ...r,
    name: `${r.label}`,
    values: [parseFloat(r.value)]
  }))
})
</script>
