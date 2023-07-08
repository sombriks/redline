<template>
  <ul>
    <li v-for="movimentacao in mState.store.movimentacoes" :key="movimentacao.id">
      {{movimentacao.tipo?.descricao}} - {{movimentacao.descricao}} - {{movimentacao.valor}}
    </li>
  </ul>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted } from 'vue'

const mState = useMovimentacaoStore()

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
