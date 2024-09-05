<template>

  <VueUiSparkbar :config="receitaDespesaBarConfig"
                 :dataset="receitaDespesaTotalPeriodo"
  ></VueUiSparkbar>
  <VueUiSparkbar :config="receitaDespesaBarConfig"
                 :dataset="receitaDespesaEfetivadaPeriodo"
  ></VueUiSparkbar>
</template>
<script setup>
import { VueUiSparkbar } from 'vue-data-ui'
import { useDashboardStore } from '@/stores/dashboardStore'
import { computed } from 'vue'
import { sparkBarConfig } from '@/services/chart-config'

const dashboardState = useDashboardStore()


const receitaDespesaBarConfig = computed(() => {
  const total =
    dashboardState.store.dashboard?.receitaDespesaTotalPeriodo?.reduce((acc, e) => {
      acc += parseFloat(e.value)
      return acc
    }, 0) || 0
  return {
    style: {
      ...sparkBarConfig.style,
      layout: {
        ...sparkBarConfig.style.layout,
        independant: true,
        percentage: false,
        target: total
      }
    }
  }
})

const receitaDespesaTotalPeriodo = computed(() => {
  return dashboardState.store.dashboard?.receitaDespesaTotalPeriodo?.map((r) => ({
    ...r,
    name: r.label,
    prefix: 'R$ ',
    value: parseFloat(r.value)
  }))
})

const receitaDespesaEfetivadaPeriodo = computed(() => {
  return dashboardState.store.dashboard?.receitaDespesaEfetivadaPeriodo?.map((r) => ({
    ...r,
    name: r.label,
    prefix: 'R$ ',
    value: parseFloat(r.value)
  }))
})

</script>
