<template>
  <v-card elevation="24" min-width="320">
    <v-card-text>
      <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
        <div class="column">
          <!-- tipo de movimentação (entrada / saída) -->
          <v-radio-group class="item" v-model="novaMovimentacao.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
          <!-- valor -->
          <v-text-field
            class="item"
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="novaMovimentacao.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          />
          <!-- novaMovimentacao.categoria_id -->
          <categoria-autocomplete class="item" v-model="novaMovimentacao.categoria_id" />
          <!-- novaMovimentacao.conta_id -->
          <conta-autocomplete
            class="item"
            v-model="novaMovimentacao.conta_id"
            :rules="[requiredRule]"
          />
          <!-- descrição -->
          <v-text-field
            class="item"
            :rules="[requiredRule]"
            v-model="novaMovimentacao.descricao"
            label="Descrição"
          />
          <!-- efetivada? -->
          <v-checkbox class="item" v-model="contaEfetivada" label="Paga?" />
          <!-- vencimento (dia do cartão se conta cartão) -->
          <chip-date class="item" label="Vencimento" v-model="novaMovimentacao.vencimento" />
          <!-- efetivada (data) -->
          <chip-date
            v-if="contaEfetivada"
            class="item"
            label="Efetivada"
            v-model="novaMovimentacao.efetivada"
          />
          <!-- recorrência (painel estendido) pra criar recorrência // criar depois //-->
          <v-divider />
          <div class="item row">
            <v-btn
              variant="outlined"
              class="ma-2"
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
              @click="router.push('/historico')"
              icon="mdi-close"
            ></v-btn>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted, reactive, ref, watch } from 'vue'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { numberRule, requiredRule } from '@/services/basic-rules'
import { router } from '@/services/router'
import ChipDate from '@/shared/chip-date.vue'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'

const contaState = useContaStore()
const categoriaState = useCategoriaStore()
const movimentacaoState = useMovimentacaoStore()

const resetMovimentacao = () => ({
  descricao: 'movimentação',
  valor: 10,
  criacao: new Date(),
  alteracao: new Date(),
  vencimento: new Date(),
  efetivada: null,
  tipo_movimentacao_id: 2,
  conta_id: null,
  categoria_id: null,
  recorrencia_id: null
})

const resetConta = () => ({})

const novaMovimentacao = reactive(resetMovimentacao())

const contaSelecionada = reactive(resetConta())

const contaEfetivada = ref(false)

const valid = ref(false)

const sync = async () => {
  await Promise.all([
    contaState.sincronizarContas(),
    categoriaState.sincronizarCategorias(),
    movimentacaoState.sincronizarMovimentacoes()
  ])
}

const salvarMovimentacao = async () => {
  if (!valid.value) return
  await movimentacaoState.salvarMovimentacao(novaMovimentacao)
  Object.assign(novaMovimentacao, resetMovimentacao())
  Object.assign(contaSelecionada, resetConta())
  router.push('/historico')
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
      if (dateFechamento <= new Date()) {
        date.setMonth(date.getMonth() + 1)
      }
      novaMovimentacao.vencimento = date
    }
  }
)

watch(
  () => contaEfetivada.value,
  () => {
    if (!contaEfetivada.value) novaMovimentacao.efetivada = null
  }
)

onMounted(sync)
</script>
<style scoped>
.column {
  display: flex;
  flex-direction: column;
}

.item {
  margin: 5px;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
