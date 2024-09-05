<template>
  <chip-valor
    label="Saldo ano anterior:"
    :valor="dashboardState.store.dashboard.saldos.anterior1Ano"
  />
  <chip-valor
    label="Saldo últimos 6 meses:"
    :valor="dashboardState.store.dashboard.saldos.anterior6Meses"
  />
  <chip-valor
    label="Saldo mês anterior:"
    :valor="dashboardState.store.dashboard.saldos.anterior1Mes"
  />
  <v-divider></v-divider>
  <chip-valor
    label="Saldo do período:"
    :valor="dashboardState.store.dashboard.saldos.periodo"
  />
  <v-divider></v-divider>
  <chip-valor
    label="Saldo projetado 1 mês:"
    :valor="dashboardState.store.dashboard.saldos.projetado1Mes"
  />
  <chip-valor
    label="Saldo projetado 6 meses:"
    :valor="dashboardState.store.dashboard.saldos.projetado6Meses"
  />
  <chip-valor
    label="Saldo projetado 1 ano:"
    :valor="dashboardState.store.dashboard.saldos.projetado1Ano"
  />
</template>
<script setup>
import ChipValor from '@/controls/chip-valor.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()
</script>
