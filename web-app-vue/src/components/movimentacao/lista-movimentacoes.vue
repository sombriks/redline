<template>
  <v-container fluid style="width: 100%">
    <v-row align="center">
      <h1>Histórico</h1>
    </v-row>
    <v-row align="center">
      <v-chip
        variant="outlined"
        class="ma-2"
        rounded
        size="large"
        color="green-accent-2"
        prepend-icon="mdi-currency-usd"
        append-icon="mdi-playlist-plus"
        @click="router.push('/nova-movimentacao')"
      >
        Nova movimentação
      </v-chip>
      <v-btn variant="outlined" rounded @click="drawer = !drawer" size="large">
        <v-icon icon="mdi-dots-vertical" />
      </v-btn>
      <v-spacer></v-spacer>
      <v-chip
        variant="outlined"
        class="ma-2"
        rounded
        size="large"
        :color="saldo >= 0 ? 'green-accent-2' : 'red-accent-2'"
        >Saldo estimado: {{ statusFiltro.saldo }}
      </v-chip>
      <v-divider thickness="5"></v-divider>
    </v-row>
    <v-row align="center">
      <!-- filtros ativos -->
      <i>Max {{ filtro.limit }} resultados,&nbsp;</i>
      <i v-if="filtro.tipo_movimentacao_id == 1">somente entradas,&nbsp;</i>
      <i v-if="filtro.tipo_movimentacao_id == 2">somente saídas,&nbsp;</i>
      <i v-if="filtro.efetivada == true">somente efetivadas,&nbsp;</i>
      <i v-if="filtro.efetivada == false">somente pendentes,&nbsp;</i>
      <i v-if="filtro.categoria_id">categoria {{ statusFiltro.categoria?.descricao }},&nbsp;</i>
      <i v-if="filtro.conta_id">conta {{ statusFiltro.conta?.descricao }},&nbsp;</i>
      <i v-if="filtro.dataFim">de {{ statusFiltro.inicio }} até {{ statusFiltro.fim }}&nbsp;</i>
    </v-row>
    <v-row align="center">
      <p v-if="!movimentacoes.length">Não há movimentações para exibir</p>
      <v-expansion-panels>
        <detalhe-movimentacao
          v-for="movimentacao in movimentacoes"
          :key="movimentacao.id"
          :movimentacao="movimentacao"
        />
      </v-expansion-panels>
    </v-row>
  </v-container>
  <v-dialog v-model="drawer" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-form @submit.prevent="aplicarFiltro">
        <v-container>
          <v-row align="center">
            <h1>Filtrar histórico</h1>
          </v-row>
          <v-row class="alinha">
            <!-- categoria -->
            <categoria-autocomplete v-model="filtro.categoria_id" />
            <v-btn
              class="alinha-item"
              icon="mdi-close"
              title="Limpar"
              variant="outlined"
              color="orange"
              @click="limpaCategoria"
            ></v-btn>
          </v-row>
          <v-row class="alinha">
            <!-- filtro.conta_id -->
            <conta-autocomplete v-model="filtro.conta_id" />
            <v-btn
              class="alinha-item"
              icon="mdi-close"
              title="Limpar"
              variant="outlined"
              color="orange"
              @click="limpaConta"
            ></v-btn>
          </v-row>
          <v-row align="center">
            <!-- tipo de movimentação -->
            <v-radio-group inline v-model="filtro.tipo_movimentacao_id">
              <template v-slot:label>
                <div>Tipo movimentação</div>
              </template>
              <v-radio :value="null" label="Tudo"></v-radio>
              <v-radio :value="1" label="Entrada"></v-radio>
              <v-radio :value="2" label="Saída"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row align="center">
            <!-- situação -->
            <v-radio-group inline v-model="filtro.efetivada">
              <template v-slot:label>
                <div>Situação</div>
              </template>
              <v-radio :value="null" label="Tudo"></v-radio>
              <v-radio :value="true" label="Efetivada"></v-radio>
              <v-radio :value="false" label="Pendente"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row align="center">
            <!-- paginação -->
            <v-radio-group inline v-model="filtro.limit">
              <template v-slot:label>
                <div>Máximo de resultados</div>
              </template>
              <v-radio :value="10000" label="10000"></v-radio>
              <v-radio :value="1000" label="1000"></v-radio>
              <v-radio :value="100" label="100"></v-radio>
              <v-radio :value="50" label="50"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row align="center">
            <!-- período -->
            <button-date label="Data inicial" v-model="filtro.dataInicio"></button-date>
            <button-date label="Data final" v-model="filtro.dataFim"></button-date>
            <v-btn
              icon="mdi-history"
              title="Restaurar para mês atual"
              variant="outlined"
              @click="restauraPeriodo"
            ></v-btn>
          </v-row>
          <v-row align="center">
            <!-- ações -->
            <v-btn
              class="ma-2"
              variant="outlined"
              color="green"
              type="submit"
              icon="mdi-check"
            ></v-btn>
            <v-btn
              variant="outlined"
              color="orange"
              class="ma-2"
              type="button"
              @click="drawer = !drawer"
              icon="mdi-close"
            ></v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import DetalheMovimentacao from '@/components/movimentacao/detalhe-movimentacao.vue'
import ButtonDate from '@/shared/button-date.vue'
import { router } from '@/services/router'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { useContaStore } from '@/stores/contaStore'
import { prepareDate, prepareMoney } from '@/services/formaters'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'

const movimentacaoStore = useMovimentacaoStore()
const categoriaStore = useCategoriaStore()
const contaStore = useContaStore()

const drawer = ref(false)

const filtro = reactive({
  tipo_movimentacao_id: null,
  efetivada: null,
  categoria_id: null,
  dataInicio: startOfMonth(new Date()),
  conta_id: null,
  dataFim: endOfMonth(new Date()),
  limit: 1000
})

const movimentacoes = computed(() => movimentacaoStore.store?.movimentacoes.map((m) => m) || [])

const saldo = computed(() => movimentacaoStore.saldo())

const statusFiltro = computed(() => ({
  inicio: filtro.dataInicio && format(prepareDate(filtro.dataInicio), 'yyyy-MM-dd'),
  fim: filtro.dataFim && format(prepareDate(filtro.dataFim), 'yyyy-MM-dd'),
  categoria: filtro.categoria_id && categoriaStore.getCategoria(filtro.categoria_id),
  conta: filtro.conta_id && contaStore.getConta(filtro.conta_id),
  saldo: prepareMoney(saldo.value)
}))

onMounted(() => {
  movimentacaoStore.sincronizarMovimentacoes()
  Object.assign(filtro, movimentacaoStore.store.filtrosMovimentacao)
})

const aplicarFiltro = () => {
  movimentacaoStore.aplicarFiltro(filtro)
  movimentacaoStore.sincronizarMovimentacoes()
  drawer.value = false
}

const limpaCategoria = () => {
  filtro.categoria_id = null
}

const limpaConta = () => {
  filtro.conta_id = null
}

const restauraPeriodo = () => {
  filtro.dataInicio = startOfMonth(new Date())
  filtro.dataFim = endOfMonth(new Date())
}
</script>
<style scoped>
.alinha {
  display: flex;
}

.alinha-item {
  margin: 5px;
}
</style>
