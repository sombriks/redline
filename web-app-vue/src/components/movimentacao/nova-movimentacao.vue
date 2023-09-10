<template>
  <v-card elevation="24" title="Nova movimentação">
    <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
      <v-container>
        <v-row align="center">
          <!-- tipo de movimentação (entrada / saída) -->
          <v-radio-group v-model="novaMovimentacao.tipo_movimentacao_id" inline>
            <template v-slot:label>
              <div>Tipo de movimentação</div>
            </template>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <!-- valor -->
          <v-text-field
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="novaMovimentacao.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <!-- descrição -->
          <v-text-field
            :rules="[requiredRule]"
            v-model="novaMovimentacao.descricao"
            label="Descrição"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <!-- conta -->
          <v-autocomplete
            v-model="novaMovimentacao.conta_id"
            :items="contaState.store.contas"
            :rules="[requiredRule]"
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
        </v-row>
        <v-row align="center">
          <!-- categoria -->
          <v-autocomplete
            v-model="novaMovimentacao.categoria_id"
            :items="categoriaState.store.categorias"
            item-title="descricao"
            item-value="id"
            label="Categoria"
            chips
          >
            <template v-slot:chip="{ props, item }">
              <v-chip v-bind="props" variant="outlined" rounded :color="item.raw.cor">{{
                item.raw.descricao
              }}</v-chip>
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
        </v-row>
        <v-row align="center">
          <!-- efetivada (data) -->
          <button-date label="Pagamento" v-model="novaMovimentacao.efetivada"></button-date>
        </v-row>
        <v-row align="center" v-if="contaSelecionada?.tipo_conta_id == 3">
          <!-- vencimento (dia do cartão se conta cartão) -->
          <button-date label="Vencimento" v-model="novaMovimentacao.vencimento"></button-date>
        </v-row>
        <v-row align="center">
          <!-- recorrência (painel estendido) pra criar recorrência // criar depois //-->
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row align="center">
          <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            color="orange"
            class="ma-2"
            type="button"
            @click="cancelar"
            icon="mdi-close"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted, reactive, ref, watch } from 'vue'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { numberRule, requiredRule } from '@/form-rules/basic-rules'
import ChipConta from '../shared/chip-conta.vue'
import ButtonDate from '../shared/button-date.vue'

const contaState = useContaStore()
const categoriaState = useCategoriaStore()
const movimentacaoState = useMovimentacaoStore()

const resetMovimentacao = () => ({
  descricao: '',
  valor: 10,
  criacao: new Date(),
  alteracao: new Date(),
  vencimento: new Date(),
  efetivada: new Date(),
  tipo_movimentacao_id: 2,
  conta_id: null,
  categoria_id: null,
  recorrencia_id: null
})

const resetConta = () => ({})

const novaMovimentacao = reactive(resetMovimentacao())

const contaSelecionada = reactive(resetConta())

const valid = ref(false)

const sync = async () => {
  await contaState.sincronizarContas()
  await categoriaState.sincronizarCategorias()
  await movimentacaoState.sincronizarMovimentacoes()
}

watch(
  () => novaMovimentacao.conta_id,
  () => {
    const conta = contaState.store.contas.find((c) => c.id == novaMovimentacao?.conta_id)
    Object.assign(contaSelecionada, conta)
    if (conta?.tipo_conta_id == 3) {
      // cartão de crédito
      const date = new Date()
      date.setDate(conta.dia_vencimento)
      const dateFechamento = new Date()
      dateFechamento.setDate(conta.dia_fechamento)
      if (dateFechamento > new Date()) {
        date.setMonth(date.getMonth() + 1)
      }
      novaMovimentacao.vencimento = date
    }
  }
)

const salvarMovimentacao = async () => {
  if (!valid.value) return
  await movimentacaoState.salvarMovimentacao(novaMovimentacao)
  await sync()
  Object.assign(novaMovimentacao, resetMovimentacao())
  Object.assign(contaSelecionada, resetConta())
  alert('Salvo!')
}

const cancelar = () => {
  Object.assign(novaMovimentacao, resetMovimentacao())
  Object.assign(contaSelecionada, resetConta())
}

onMounted(sync)
</script>
