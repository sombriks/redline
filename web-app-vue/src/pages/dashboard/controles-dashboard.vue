<template>
  <v-container fluid>
    <v-row>
      <h1>Dashboard</h1>
      <!-- filtro período -->
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row>
      <v-expansiuon-panels v-model="folha" variant="accordion">
        <v-expansion-panel value="composicao">
          <v-expansion-panel-title>Composição</v-expansion-panel-title>
          <v-expansion-panel-text>
            <composicao/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="rxd">
          <v-expansion-panel-title>Receitas x Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <receita-x-despesa/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="limites">
          <v-expansion-panel-title>Limites</v-expansion-panel-title>
          <v-expansion-panel-text>
            <limites/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="vencimentos">
          <v-expansion-panel-title>Vencimentos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <vencimentos/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="planejamentos">
          <v-expansion-panel-title>Planejamentos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <planejamentos/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="despesas">
          <v-expansion-panel-title>Detalhes Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <despesas/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="receitas">
          <v-expansion-panel-title>Detalhes Receitas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <receitas/>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="saldos">
          <v-expansion-panel-title>Saldos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <saldos/>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansiuon-panels>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import { endOfMonth, startOfMonth } from 'date-fns'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import ChipPeriodo from '@/shared/chip-periodo.vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import Saldos from '@/pages/dashboard/graficos/saldos.vue'
import Vencimentos from '@/pages/dashboard/graficos/vencimentos.vue'
import Receitas from '@/pages/dashboard/graficos/receitas.vue'
import Despesas from '@/pages/dashboard/graficos/despesas.vue'
import Planejamentos from '@/pages/dashboard/graficos/planejamentos.vue'
import Limites from '@/pages/dashboard/graficos/limites.vue'
import ReceitaXDespesa from '@/pages/dashboard/graficos/receita-x-despesa.vue'
import Composicao from '@/pages/dashboard/graficos/composicao.vue'

const router = useRouter()

const dashboardState = useDashboardStore()

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const folha = ref('')

watch([inicio, fim], async ([inicio, fim]) => {
  await dashboardState.sincronizarDashboard(inicio, fim)
})

onMounted(async () => {
  try {
    await dashboardState.sincronizarDashboard(inicio.value, fim.value)
  } catch (e) {
    console.log(e)
    await router.push('/auth')
  }
})
</script>
