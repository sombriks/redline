<template>
  <v-card
    elevation="24"
    min-width="320"
    :title="
      props?.movimentacao?.id
        ? `Editar movimentação #${props.movimentacao.id}`
        : 'Nova movimentação'
    "
  >
    <v-card-text>
      <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
        <div class="column">
          <!-- tipo de movimentação (entrada / saída) -->
          <v-radio-group class="item" v-model="movForm.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
          <!-- valor -->
          <v-text-field
            class="item"
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="movForm.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          />
          <!--  movEdit.categoria_id-->
          <categoria-autocomplete class="item" v-model="movForm.categoria_id" />
          <!--  movEdit.conta_id-->
          <conta-autocomplete class="item" v-model="movForm.conta_id" :rules="[requiredRule]" />
          <!--  movEdit.descricao-->
          <v-text-field
            class="item"
            :rules="[requiredRule]"
            v-model="movForm.descricao"
            label="Descrição"
          />
          <!-- vencimento (dia do cartão se conta cartão) -->
          <chip-date class="item" label="Vencimento" v-model="movForm.vencimento" />
          <!-- efetivada? -->
          <v-checkbox
            v-if="!props?.movimentacao?.id"
            class="item"
            v-model="contaEfetivada"
            label="Paga?"
          />
          <!-- efetivada (data) -->
          <chip-date
            v-if="contaEfetivada || props?.movimentacao?.id"
            class="item"
            label="Efetivada"
            v-model="movForm.efetivada"
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
            <v-spacer v-if="!props?.movimentacao?.id"></v-spacer>
            <v-btn
              variant="outlined"
              color="orange"
              class="ma-2"
              type="button"
              @click="router.push('/historico')"
              icon="mdi-close"
            ></v-btn>
            <v-spacer v-if="props?.movimentacao?.id"></v-spacer>
            <v-btn
              v-if="props?.movimentacao?.id"
              variant="outlined"
              color="red"
              class="ma-2"
              type="button"
              @click="excluirMovimentacao"
              icon="mdi-trash-can-outline"
            ></v-btn>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { numberRule, requiredRule } from '@/services/basic-rules'
import ChipDate from '@/shared/chip-date.vue'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'
const props = defineProps(['movimentacao'])

const contaState = useContaStore()

const router = useRouter()
const categoriaState = useCategoriaStore()
const movimentacaoState = useMovimentacaoStore()

const resetMovimentacao = () => {
  return props?.movimentacao?.id
    ? { ...props?.movimentacao }
    : {
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
      }
}

const resetConta = () => ({})

const movForm = reactive(resetMovimentacao())

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
  await movimentacaoState.salvarMovimentacao(movForm)
  Object.assign(movForm, resetMovimentacao())
  Object.assign(contaSelecionada, resetConta())
  router.push('/historico')
}

const excluirMovimentacao = async () => {
  if (confirm(`Deseja realmente excluir a movimentação #${props.movimentacao.id}`)) {
    await movimentacaoState.excluirMovimentacao(props.movimentacao)
    await router.push('/historico')
  }
}

watch(
  () => movForm.conta_id,
  () => {
    const conta = contaState.store.contas.find((c) => c.id == movForm?.conta_id)
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
      movForm.vencimento = date
    }
  }
)

watch(
  () => contaEfetivada.value,
  () => {
    if (!contaEfetivada.value) movForm.efetivada = null
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
