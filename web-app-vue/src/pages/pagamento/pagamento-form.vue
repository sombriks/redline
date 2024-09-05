<template>
  <v-container fluid>
    <v-row align="center">
      <v-form v-model="valid" @submit.prevent.stop="pagar">
        <div class="column">
          <categoria-autocomplete
            class="item"
            label="Categoria da transferência"
            v-model="formPagamento.categoria"
            :rules="[requiredRule('Categoria obrigatória')]"
          />
          <conta-autocomplete
            class="item"
            label="Conta de origem"
            v-model="formPagamento.contaOrigem"
            :rules="[requiredRule('Conta origem obrigatória')]"
          />
          <conta-autocomplete
            class="item"
            label="Conta de destino"
            v-model="formPagamento.contaDestino"
            :rules="[requiredRule('Conta destino obrigatória')]"
          />
          <chip-date class="item" label="Data pagamento" v-model="formPagamento.vencimento" />
          <chip-periodo
            label="Período"
            v-model:inicial="formPagamento.inicial"
            v-model:final="formPagamento.final"
          ></chip-periodo>
          <v-divider />
          <p v-if="movimentacoes.length > 0">valor total: {{ prepareMoney(valorTotal) }}</p>
          <v-chip-group v-model="selMovimentacao" column multiple>
            <chip-descricao
              size="small"
              filter
              v-for="movimentacao in movimentacoes"
              :key="movimentacao.id"
              :value="movimentacao"
            >
              {{ prepareDate(movimentacao.vencimento).toLocaleDateString() }} |
              {{ prepareMoney(movimentacao.valor) }}
            </chip-descricao>
          </v-chip-group>
          <!-- movimentações do período -->
          <v-divider />
          <div class="item row">
            <v-btn
              variant="outlined"
              class="ma-2"
              color="green"
              type="submit"
              icon="mdi-check"
              :disabled="selMovimentacao.length === 0"
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
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { requiredRule } from '@/services/basic-rules'
import ContaAutocomplete from '@/controls/conta-autocomplete.vue'
import ChipPeriodo from '@/controls/chip-periodo.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import ChipDate from '@/controls/chip-date.vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import ChipDescricao from '@/controls/chip-descricao.vue'
import { prepareDate, prepareMoney } from '@/services/formatters'
import CategoriaAutocomplete from '@/controls/categoria-autocomplete.vue'

const router = useRouter()
const movimentacaoStore = useMovimentacaoStore()

const valid = ref(false)
const selMovimentacao = ref([])
const formPagamento = reactive({
  inicial: startOfMonth(new Date()),
  final: endOfMonth(new Date()),
  vencimento: new Date(),
  contaDestino: 0,
  contaOrigem: 0,
  categoria: 0
})

const movimentacoes = computed(() => {
  if (
    !formPagamento.contaOrigem ||
    !formPagamento.contaDestino ||
    !formPagamento.inicial ||
    !formPagamento.final
  )
    return []
  return movimentacaoStore.store.movimentacoes
})

const valorTotal = computed(() => selMovimentacao.value.reduce((acc, m) => (acc += m.valor), 0))

watch(formPagamento, async () => {
  if (
    formPagamento.contaOrigem !== 0 &&
    formPagamento.contaDestino !== 0 &&
    formPagamento.inicial &&
    formPagamento.final
  ) {
    await movimentacaoStore.doListMovimentacoes({
      conta_id: formPagamento.contaDestino,
      dataInicio: formPagamento.inicial,
      dataFim: formPagamento.final,
      tipo_movimentacao_id: 2,
      interna: false,
      efetivada: false
    })
    selMovimentacao.value = movimentacaoStore.store.movimentacoes
  } else selMovimentacao.value = []
})

const pagar = async () => {
  if (valid.value && confirm('deseja realmente pagar os itens selecionados?')) {
    try {
      await movimentacaoStore.pagar({
        movimentacoes_id: selMovimentacao.value.map(m => m.id),
        conta_destino_id: formPagamento.contaDestino,
        categoria_id: formPagamento.categoria,
        vencimento: formPagamento.vencimento,
        conta_id: formPagamento.contaOrigem,
        valor: valorTotal.value
      })
      alert("pagamento realizado com sucesso!")
      await router.push('/historico')
    } catch (e) {
      console.log(e)
      alert('não foi possível pagar os itens selecionados.')
    }
  }
}
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
