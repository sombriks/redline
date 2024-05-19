<template>
  <v-container fluid>
    <v-row>
      <h1>Dashboard</h1>
      <!-- filtro período -->
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row>
      <v-expansion-panels v-model="folha" variant="accordion">
        <v-expansion-panel value="rxd">
          <!-- receitas x despesas totais (simple-bar) -->
          <!-- receitas x despesas efetivadas (simple-bar) -->
          <v-expansion-panel-title>Receitas x Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <VueUiSparkbar
              :config="receitaDespesaBarConfig"
              :dataset="receitaDespesaTotalPeriodo"
            ></VueUiSparkbar>
            <br />
            <v-divider></v-divider>
            <br />
            <VueUiSparkbar
              :config="receitaDespesaBarConfig"
              :dataset="receitaDespesaEfetivadaPeriodo"
            ></VueUiSparkbar>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="limites">
          <!-- limites por conta banco -->
          <!-- limites por conta cartão -->
          <!-- situação dos limites (linhas no plano com a REDLINE do limite da conta / cartão)-->
          <v-expansion-panel-title>Limites</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(limite, i) in limites" :key="i">
              <VueUiXy :config="lineChartConfig" :dataset="limite" />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="vencimentos">
          <!-- quantidade de contas vencidas (chips)-->
          <!-- quantidade de contas a vencer (chips)-->
          <v-expansion-panel-title>Vencimentos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-chip variant="outlined" class="ma-1" rounded size="large" color="green">
              Quitadas: {{ dashboardState.store.dashboard.vencimentos.quitadas }}
            </v-chip>
            <v-chip variant="outlined" class="ma-1" rounded size="large" color="cyan">
              A vencer: {{ dashboardState.store.dashboard.vencimentos.a_vencer }}
            </v-chip>
            <v-chip variant="outlined" class="ma-1" rounded size="large" color="orange">
              Em atraso: {{ dashboardState.store.dashboard.vencimentos.em_atraso }}
            </v-chip>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="planejamentos">
          <!-- situação dos planejamentos (linhas no plano com a REDLINE do planejamento)-->
          <v-expansion-panel-title>Planejamentos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(planejamento, i) in planejamentos" :key="i">
              <VueUiXy :config="lineChartConfig" :dataset="planejamento" />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="despesas">
          <!-- despesas por conta (pizza) -->
          <!-- despesas por categoria (pizza) -->
          <v-expansion-panel-title>Detalhes Despesas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <h3>Despesas por conta</h3>
            <VueUiDonut :config="donutConfig" :dataset="despesaConta"></VueUiDonut>
            <br />
            <v-divider></v-divider>
            <br />
            <h3>Despesas por categoria</h3>
            <VueUiDonut :config="donutConfig" :dataset="despesaCategoria"></VueUiDonut>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="receitas">
          <!-- receitas por conta (pizza) -->
          <!-- receitas por categoria (pizza) -->
          <v-expansion-panel-title>Detalhes Receitas</v-expansion-panel-title>
          <v-expansion-panel-text>
            <h3>Receitas por conta</h3>
            <VueUiDonut :config="donutConfig" :dataset="receitaConta"></VueUiDonut>
            <br />
            <v-divider></v-divider>
            <br />
            <h3>Receitas por categoria</h3>
            <VueUiDonut :config="donutConfig" :dataset="receitaCategoria"></VueUiDonut>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="composicao">
          <!-- composição despesas (stacked bar conta/categorias)-->
          <!-- composição receitas (stacked bar conta/categorias)-->
          <v-expansion-panel-title>Composição</v-expansion-panel-title>
          <v-expansion-panel-text>
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
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="saldos">
          <!-- saldos (tabelinha/chips)-->
          <!--    anterior 1 ano-->
          <!--    anterior 6 meses-->
          <!--    anterior 1 mês-->
          <!--    período selecionado-->
          <!--    projetado 1 mês-->
          <!--    projetado 6 meses-->
          <!--    projetado 1 ano-->
          <v-expansion-panel-title>Saldos</v-expansion-panel-title>
          <v-expansion-panel-text>
            <chip-saldo
              label="Saldo ano anterior:"
              :saldo="dashboardState.store.dashboard.saldos.anterior1Ano"
            />
            <chip-saldo
              label="Saldo últimos 6 meses:"
              :saldo="dashboardState.store.dashboard.saldos.anterior6Meses"
            />
            <chip-saldo
              label="Saldo mês anterior:"
              :saldo="dashboardState.store.dashboard.saldos.anterior1Mes"
            />
            <v-divider></v-divider>
            <chip-saldo
              label="Saldo do período:"
              :saldo="dashboardState.store.dashboard.saldos.periodo"
            />
            <v-divider></v-divider>
            <chip-saldo
              label="Saldo projetado 1 mês:"
              :saldo="dashboardState.store.dashboard.saldos.projetado1Mes"
            />
            <chip-saldo
              label="Saldo projetado 6 meses:"
              :saldo="dashboardState.store.dashboard.saldos.projetado6Meses"
            />
            <chip-saldo
              label="Saldo projetado 1 ano:"
              :saldo="dashboardState.store.dashboard.saldos.projetado1Ano"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script setup>
import { endOfMonth, startOfMonth } from 'date-fns'
import { computed, onMounted, ref, watch } from 'vue'
import { VueUiDonut, VueUiSparkbar, VueUiSparkStackbar, VueUiXy } from 'vue-data-ui'
import ChipPeriodo from '@/pages/shared/chip-periodo.vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import ChipSaldo from '@/pages/shared/chip-saldo.vue'
import {
  donutConfig,
  lineChartConfig,
  sparkBarConfig,
  sparkStackBarConfig
} from '@/services/chart-config'

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const folha = ref('')

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

const planejamentos = computed(() => {
  const planejamentos = {}
  dashboardState.store.dashboard?.planejamentos?.forEach((planejamento) => {
    if(!planejamentos[planejamento.descricao]) {
      planejamentos[planejamento.descricao] = [
        {
          shape: 'square',
          name: 'Limite',
          color: 'red',
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
            .map((l) => -l.acc)
        }
      ]
    }
  })
  return Object.values(planejamentos)
})

watch([inicio, fim], async ([inicio, fim]) => {
  await dashboardState.sincronizarDashboard(inicio, fim)
})

onMounted(async () => {
  await dashboardState.sincronizarDashboard(inicio.value, fim.value)
})
</script>
