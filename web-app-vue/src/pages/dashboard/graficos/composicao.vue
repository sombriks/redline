<template>
  <h3>Composição de despesas</h3>
  <div v-for="conta in composicaoDespesas" :key="conta.descricao">
    <h4>{{ conta.descricao }}</h4>
    <VueUiSparkStackbar
      :config="sparkStackBarConfig"
      :dataset="conta.data"
    ></VueUiSparkStackbar>
  </div>
  <br />
  <v-divider></v-divider>
  <br />
  <h3>Composição de receitas</h3>
  <div v-for="conta in composicaoReceitas" :key="conta.descricao">
    <h4>{{ conta.descricao }}</h4>
    <VueUiSparkStackbar
      :config="sparkStackBarConfig"
      :dataset="conta.data"
    ></VueUiSparkStackbar>
  </div>
</template>
<script setup>
import { VueUiSparkStackbar } from 'vue-data-ui'
import { sparkStackBarConfig } from '@/services/chart-config'
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()

const composicaoDespesas = computed(() => {
  return dashboardState.store.dashboard?.composicaoDespesas?.map((g) => {
    return {
      ...g,
      data: g.data.map((r) => ({
        ...r,
        name: r.label,
        value: parseFloat(r.value)
      }))
    }
  })
})

const composicaoReceitas = computed(() => {
  return dashboardState.store.dashboard?.composicaoReceitas?.map((g) => {
    return {
      ...g,
      data: g.data.map((r) => ({
        ...r,
        name: r.label,
        value: parseFloat(r.value)
      }))
    }
  })
})

</script>
