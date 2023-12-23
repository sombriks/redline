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
      <v-divider thickness="5"></v-divider>
    </v-row>
    <v-row align="center">
      <!-- filtros ativos -->
      <i>Max {{filtro.limit}} resultados</i>
      <i v-if="filtro.tipo_movimentacao_id == 1">, entradas</i>
      <i v-if="filtro.tipo_movimentacao_id == 2">, saídas</i>
      <i v-if="filtro.dataFim">, de {{intervalo.inicio}} até {{intervalo.fim}}</i>
      <span>&nbsp;</span>

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
            <v-autocomplete
              class="alinha-item"
              v-model="filtro.categoria_id"
              :items="categoriaStore.store.categorias"
              item-title="descricao"
              item-value="id"
              label="Categoria"
              chips
            >
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" variant="outlined" rounded :color="item.raw.cor"
                  >{{ item.raw.descricao }}
                </v-chip>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item>
                  <v-chip
                    class="ma-2"
                    v-bind="props"
                    variant="outlined"
                    rounded
                    :color="item.raw.cor"
                  >
                    {{ item.raw.descricao }}
                  </v-chip>
                </v-list-item>
              </template>
            </v-autocomplete>
            <v-btn
              class="alinha-item"
              icon="mdi-close"
              title="Limpar"
              variant="outlined"
              @click="limpaCategoria"
            ></v-btn>
          </v-row>
          <v-row class="alinha">
            <!-- conta -->
            <v-autocomplete
              class="alinha-item"
              v-model="filtro.conta_id"
              :items="contaStore.store.contas"
              item-title="descricao"
              item-value="id"
              label="Conta"
              chips
            >
              <template v-slot:chip="{ props, item }">
                <chip-conta v-bind="props" :conta="item.raw" :color="item.raw.cor"></chip-conta>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item>
                  <chip-conta
                    class="ma-2"
                    v-bind="props"
                    :conta="item.raw"
                    :color="item.raw.cor"
                  ></chip-conta>
                </v-list-item>
              </template>
            </v-autocomplete>
            <v-btn
              class="alinha-item"
              icon="mdi-close"
              title="Limpar"
              variant="outlined"
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
            <!-- paginação -->
            <v-radio-group inline v-model="filtro.limit">
              <template v-slot:label>
                <div>Máximo resultados</div>
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
            <v-btn icon="mdi-history" title="Restaurar" variant="outlined" @click="restauraPeriodo"></v-btn>
          </v-row>
          <v-row align="center">
            <!-- ações -->
            <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
            <v-btn
              variant="tonal"
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
import ButtonDate from '@/components/shared/button-date.vue'
import { router } from '@/routes/router'
import { useCategoriaStore } from '@/stores/categoriaStore'
import ChipConta from '@/components/shared/chip-conta.vue'
import { useContaStore } from '@/stores/contaStore'
import { prepareDate } from '@/services/formaters'
import { endOfMonth, format, startOfMonth } from 'date-fns'

const movimentacaoStore = useMovimentacaoStore()
const categoriaStore = useCategoriaStore()
const contaStore = useContaStore()

const drawer = ref(false)

const filtro = reactive({
  tipo_movimentacao_id: null,
  categoria_id: null,
  dataInicio: startOfMonth(new Date()),
  conta_id: null,
  dataFim: endOfMonth(new Date()),
  limit: 1000
})

const movimentacoes = computed(() => movimentacaoStore.store?.movimentacoes.map((m) => m) || [])

const intervalo = computed(() => ({
  inicio: filtro.dataInicio && format(prepareDate(filtro.dataInicio),"yyyy-MM-dd"),
  fim: filtro.dataFim && format(prepareDate(filtro.dataFim),"yyyy-MM-dd")
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
