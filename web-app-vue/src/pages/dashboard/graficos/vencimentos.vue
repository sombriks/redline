<template>
  <v-chip variant="outlined" class="ma-1" rounded size="large" color="green">
    Quitadas: {{ dashboardState.store.dashboard.vencimentos.quitadas }}
  </v-chip>
  <v-chip variant="outlined" class="ma-1" rounded size="large" color="cyan">
    A vencer: {{ dashboardState.store.dashboard.vencimentos.a_vencer }}
  </v-chip>
  <v-chip variant="outlined" class="ma-1" rounded size="large" color="orange">
    Em atraso: {{ dashboardState.store.dashboard.vencimentos.em_atraso }}
  </v-chip>
</template>
<script setup>
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardState = useDashboardStore()
</script>
