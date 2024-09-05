<template>
  <v-container fluid>
    <v-row class="barra-botoes-acoes" align="center">
      <v-chip
        variant="outlined"
        class="ma-2"
        rounded
        size="large"
        color="green-accent-2"
        prepend-icon="mdi-cash"
        append-icon="mdi-playlist-plus"
        @click="router.push('/nova-movimentacao')"
      >
        Nova movimentação
      </v-chip>
      <v-btn
        variant="outlined"
        rounded="rounded-circle"
        @click="drawer = !drawer"
        icon="mdi-dots-vertical"
      ></v-btn>
      <v-spacer></v-spacer>
      <chip-saldo label="Saldo Estimado:" :movimentacoes="movimentacoes" />
      <v-divider thickness="5"></v-divider>
    </v-row>
    <v-row class="barra-filtros-ativos" align="center">
      <!-- filtros ativos -->
      <i>Max {{ filtro.limit }} resultados,&nbsp;</i>
      <i v-if="filtro.tipo_movimentacao_id === 1">somente entradas,&nbsp;</i>
      <i v-if="filtro.tipo_movimentacao_id === 2">somente saídas,&nbsp;</i>
      <i v-if="filtro.efetivada === true">somente efetivadas,&nbsp;</i>
      <i v-if="filtro.efetivada === false">somente pendentes,&nbsp;</i>
      <i v-if="filtro.categoria_id">categoria {{ statusFiltro.categoria?.descricao }},&nbsp;</i>
      <i v-if="filtro.conta_id">conta {{ statusFiltro.conta?.descricao }},&nbsp;</i>
      <i v-if="filtro.dataFim">de {{ statusFiltro.inicio }} até {{ statusFiltro.fim }}&nbsp;</i>
      <v-divider thickness="5"></v-divider>
    </v-row>
    <v-row v-if="!agrupamento" align="center">
      <p v-if="!movimentacoes.length">Não há movimentações para exibir</p>
      <chip-movimentacao
        v-for="movimentacao in movimentacoes"
        :key="movimentacao.id"
        :movimentacao="movimentacao"
        @click="movimentacaoClick"
      ></chip-movimentacao>
    </v-row>
    <v-row v-if="agrupamento === 'conta'" align="center" class="vh-80-scroll">
      <v-list width="100%">
        <v-list-item v-for="conta in agrupamentoConta" :key="conta.descricao">
          <chip-conta :conta="conta" />
          <chip-saldo :saldo="conta.saldo" />
        </v-list-item>
      </v-list>
    </v-row>
    <v-row v-if="agrupamento === 'categoria'" align="center" class="vh-80-scroll">
      <v-list width="100%">
        <v-list-item v-for="cat in agrupamentoCategoria" :key="cat.descricao">
          <v-chip v-if="cat" variant="outlined" class="ma-1" rounded size="large" :color="cat.cor"
            >{{ cat.descricao }}
          </v-chip>
          <chip-saldo :saldo="cat.saldo" />
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
  <v-dialog v-model="drawer" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-form @submit.prevent="aplicarFiltro">
        <v-container>
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
            <!-- ver transferências -->
            <v-radio-group inline v-model="filtro.interna">
              <template v-slot:label>
                <div>Ver transferências/pagamentos</div>
              </template>
              <v-radio :value="false" label="Não"></v-radio>
              <v-radio :value="true" label="Sim"></v-radio>
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
            <!-- Agrupamento -->
            <v-radio-group inline v-model="agrupamento">
              <template v-slot:label>
                <div>Agrupamento</div>
              </template>
              <v-radio :value="null" label="Nenhum"></v-radio>
              <v-radio value="conta" label="Conta"></v-radio>
              <v-radio value="categoria" label="Categoria"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row align="center">
            <!-- período -->
            <chip-periodo
              label="Período"
              v-model:inicial="filtro.dataInicio"
              v-model:final="filtro.dataFim"
            ></chip-periodo>
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
            <v-spacer></v-spacer>
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
import { useRouter } from 'vue-router'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { useContaStore } from '@/stores/contaStore'
import { prepareBalance, prepareDate } from '@/services/formatters'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import CategoriaAutocomplete from '@/controls/categoria-autocomplete.vue'
import ContaAutocomplete from '@/controls/conta-autocomplete.vue'
import ChipSaldo from '@/controls/chip-saldo-movimentacao.vue'
import ChipConta from '@/controls/chip-conta.vue'
import ChipPeriodo from '@/controls/chip-periodo.vue'
import ChipMovimentacao from '@/controls/chip-movimentacao.vue'

const movimentacaoStore = useMovimentacaoStore()
const categoriaStore = useCategoriaStore()
const contaStore = useContaStore()

const router = useRouter()

const drawer = ref(false)

const filtro = reactive({
  tipo_movimentacao_id: null,
  interna: false,
  efetivada: null,
  categoria_id: null,
  dataInicio: startOfMonth(new Date()),
  conta_id: null,
  dataFim: endOfMonth(new Date()),
  limit: 1000
})

const agrupamento = ref(null)

const movimentacoes = computed(() => movimentacaoStore.store?.movimentacoes || [])

const agrupamentoConta = computed(() => {
  return contaStore.store.contas.map((c) => {
    const thisAccount = movimentacoes.value.filter((m) => m.conta_id === c.id)
    // console.log(thisAccount)
    return {
      ...c,
      saldo: prepareBalance(thisAccount)
    }
  })
})

const agrupamentoCategoria = computed(() => {
  return categoriaStore.store.categorias
    .map((c) => {
      const thisCategory = movimentacoes.value.filter((m) => m.categoria_id === c.id)
      return {
        ...c,
        saldo: prepareBalance(thisCategory)
      }
    })
    .filter((ac) => ac.saldo !== 0)
})

const statusFiltro = computed(() => ({
  inicio: filtro.dataInicio && format(prepareDate(filtro.dataInicio), 'yyyy-MM-dd'),
  fim: filtro.dataFim && format(prepareDate(filtro.dataFim), 'yyyy-MM-dd'),
  categoria: filtro.categoria_id && categoriaStore.getCategoria(filtro.categoria_id),
  conta: filtro.conta_id && contaStore.getConta(filtro.conta_id)
}))

onMounted(async () => {
  await Promise.all([
    contaStore.sincronizarContas(),
    categoriaStore.sincronizarCategorias(),
    movimentacaoStore.sincronizarMovimentacoes()
  ])
  Object.assign(filtro, movimentacaoStore.store.filtrosMovimentacao)
})

const aplicarFiltro = async () => {
  movimentacaoStore.aplicarFiltro(filtro)
  await movimentacaoStore.sincronizarMovimentacoes()
  drawer.value = false
}

const limpaCategoria = () => {
  filtro.categoria_id = null
}

const limpaConta = () => {
  filtro.conta_id = null
}

const movimentacaoClick = (e) => {
  if (e.mode === 1) {
    // 0 -> modo chip, 1 -> modo card
    router.push(`/editar-movimentacao/${e.movimentacao.id}`)
  }
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
