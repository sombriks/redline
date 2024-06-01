<template>
  <v-chip
    v-if="mode === 0"
    variant="outlined"
    class="ma-2"
    rounded
    size="x-large"
    :color="conta?.cor"
    :append-icon="
      props.movimentacao?.id
        ? props.movimentacao?.tipo_movimentacao_id == 1
          ? 'mdi-cash-plus'
          : 'mdi-cash-minus'
        : 'mdi-cash'
    "
    :prepend-icon="contaIcon"
    @click="onClick"
    >{{ data }} | {{ valor }}
  </v-chip>
  <v-card
    v-if="mode === 1"
    variant="outlined"
    rounded="xl"
    min-width="320"
    class="ma-2"
    color="white"
    :append-icon="movIcon"
    :prepend-icon="contaIcon"
  >
    <v-card-text>
      <chip-descricao size="default">{{ data }}</chip-descricao>
      <chip-conta size="default" :conta="conta"></chip-conta>
      <chip-categoria size="default" :categoria="categoria"></chip-categoria>
      <chip-descricao size="default" :color="isEntrada ? 'green' : 'red'"
        >{{ valor }}
      </chip-descricao>
      <chip-descricao size="default">{{ props.movimentacao?.descricao }}</chip-descricao>
      <chip-descricao size="default" :color="corPagamento">{{ statusPagamento }}</chip-descricao>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        class="ma-2"
        color="green"
        icon="mdi-playlist-edit"
        @click="onClick"
      ></v-btn>
      <v-btn
        variant="outlined"
        color="orange"
        class="ma-2"
        type="button"
        icon="mdi-close"
        @click="mode = 0"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { computed, defineModel } from 'vue'
import { prepareDate, prepareMoney } from '@/services/formaters'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import ChipCategoria from '@/shared/chip-categoria.vue'
import ChipConta from '@/shared/chip-conta.vue'
import ChipDescricao from '@/shared/chip-descricao.vue'
import { isBefore } from 'date-fns'

const mode = defineModel('mode', { default: 0 })
const props = defineProps(['movimentacao'])
const emit = defineEmits(['click'])

const contaStore = useContaStore()
const categoriaStore = useCategoriaStore()

const data = computed(() => prepareDate(props.movimentacao?.vencimento).toLocaleDateString())
const valor = computed(() => prepareMoney(props.movimentacao?.valor))
const conta = computed(() =>
  contaStore.store.contas?.find((c) => c.id === props.movimentacao?.conta_id)
)
const categoria = computed(() =>
  categoriaStore.store.categorias.find((c) => c.id === props.movimentacao?.categoria_id)
)

const contaIcon = computed(() => {
  if (parseInt(conta?.value.tipo_conta_id) === 2) return 'mdi-bank'
  if (parseInt(conta?.value.tipo_conta_id) === 3) return 'mdi-credit-card'
  return 'mdi-wallet'
})

const isEntrada = computed(() => {
  return props.movimentacao?.tipo_movimentacao_id === 1
})

const movIcon = computed(() => {
  if (props.movimentacao?.id) {
    if (isEntrada.value) return 'mdi-cash-plus'
    else return 'mdi-cash-minus'
  } else return 'mdi-cash'
})

const corPagamento = computed(() => {
  if (props.movimentacao.efetivada !== undefined && props.movimentacao.efetivada !== null)
    return 'green'
  else if (isBefore(new Date(), prepareDate(props.movimentacao.vencimento))) return 'cyan'
  else return 'red'
})

const statusPagamento = computed(() => {
  if (props.movimentacao.efetivada !== undefined && props.movimentacao.efetivada !== null)
    return 'Quitada'
  else if (isBefore(new Date(), prepareDate(props.movimentacao.vencimento))) return 'A vencer'
  else return 'Em atraso'
})

const onClick = () => {
  emit('click', { movimentacao: props.movimentacao, mode: mode.value })
  mode.value = (mode.value + 1) % 2
}
</script>
<style scoped></style>
