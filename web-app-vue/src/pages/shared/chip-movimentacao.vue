<template>
  <v-chip
    v-if="!mode || mode === 1"
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
</template>
<script setup>
import { computed } from 'vue'
import { prepareDate, prepareMoney } from '@/services/formaters'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const props = defineProps(['movimentacao', 'mode'])
const emit = defineEmits(['click'])

const contaStore = useContaStore()
const categoriaStore = useCategoriaStore()

const data = computed(() => prepareDate(props.movimentacao?.vencimento).toLocaleDateString())
const valor = computed(() => prepareMoney(props.movimentacao?.valor))
const conta = computed(() =>
  contaStore.store.contas?.find((c) => c.id === props.movimentacao?.conta_id)
)

const contaIcon = computed(() => {
  console.log(conta)
  if (conta?.value.tipo_conta_id == '2') return 'mdi-bank'
  if (conta?.value.tipo_conta_id == '3') return 'mdi-credit-card'
  return 'mdi-wallet'
})

const onClick = () => emit('click')
</script>
<style scoped></style>
