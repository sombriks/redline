<template>

  <div v-for="(planejamento, i) in planejamentos" :key="i">
    <h3>{{ planejamento[1].name }}</h3>
    <VueUiXy :config="lineChartConfig" :dataset="planejamento" />
  </div>
</template>
<script setup>
import { lineChartConfig } from '@/services/chart-config'
import { computed } from 'vue'
import { VueUiXy } from 'vue-data-ui'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()

const planejamentos = computed(() => {
  const planejamentos = {}
  dashboardState.store.dashboard?.planejamentos?.forEach((planejamento) => {
    if (!planejamentos[planejamento.descricao]) {
      planejamentos[planejamento.descricao] = [
        {
          shape: 'square',
          name: 'Limite',
          color: planejamento.type === 'ENTRADA' ? 'lightgreen' : 'red',
          type: 'line',
          series: dashboardState.store.dashboard?.planejamentos
            ?.filter((l) => l.descricao === planejamento.descricao)
            .map((l) => l.redline)
        },
        {
          name: planejamento.descricao,
          useProgression: true,
          color: planejamento.color,
          dataLabels: true,
          shape: 'circle',
          useTag: 'none',
          useArea: true,
          smooth: true,
          type: 'line',
          series: dashboardState.store.dashboard?.planejamentos
            ?.filter((l) => l.descricao === planejamento.descricao)
            .map((l) => planejamento.type === 'ENTRADA' ? l.acc : -l.acc)
        }
      ]
    }
  })
  return Object.values(planejamentos)
})
</script>
