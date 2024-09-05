<template>
  <v-chip
    variant="outlined"
    class="ma-2"
    rounded
    size="large"
    :prepend-icon="icon"
    :color="saldo >= 0 ? 'green-accent-2' : 'red-accent-2'"
    @click="showing = ++showing % 3"
  >
    {{label}} &nbsp;
    <span v-if="showing === 0">{{ prepareMoney(entrada) }}</span>
    <span v-if="showing === 1">-{{ prepareMoney(saida) }}</span>
    <span v-if="showing === 2">{{ prepareMoney(saldo) }}</span>
  </v-chip>
</template>
<style></style>
<script setup>
import { computed, ref } from 'vue'
import { prepareBalance, prepareExpense, prepareIncome, prepareMoney } from '@/services/formatters'

const props = defineProps(['label', 'movimentacoes'])

const showing = ref(0)
const icon = computed(() =>
  showing.value === 0
    ? 'mdi-cash-plus'
    : showing.value === 1
    ? 'mdi-cash-minus'
    : 'mdi-scale-unbalanced'
)
const entrada = computed(() => prepareIncome(props.movimentacoes))
const saida = computed(() => prepareExpense(props.movimentacoes))
const saldo = computed(() => prepareBalance(props.movimentacoes))
</script>
