<template>

  <div v-for="(limite, i) in limites" :key="i">
    <h3>{{ limite[1].name }}</h3>
    <VueUiXy :config="lineChartConfig" :dataset="limite" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { VueUiXy } from 'vue-data-ui'
import { lineChartConfig } from '@/services/chart-config'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()

const limites = computed(() => {
  const contas = {}
  dashboardState.store.dashboard?.limites?.forEach((limite) => {
    if (!contas[limite.descricao]) {
      contas[limite.descricao] = [
        {
          shape: 'square',
          name: 'Limite',
          color: 'red',
          type: 'line',
          series: dashboardState.store.dashboard?.limites
            ?.filter((l) => l.descricao === limite.descricao)
            .map((l) => -l.redline)
        },
        {
          name: limite.descricao,
          useProgression: true,
          color: limite.color,
          dataLabels: true,
          shape: 'circle',
          useTag: 'none',
          useArea: true,
          smooth: true,
          type: 'line',
          series: dashboardState.store.dashboard?.limites
            ?.filter((l) => l.descricao === limite.descricao)
            .map((l) => l.acc)
        }
      ]
    }
  })
  return Object.values(contas)
})

</script>
