<template>
  <ul>
    <li v-for="movimentacao in movimentacoes" :key="movimentacao.id">
      {{ movimentacao.tipo?.descricao }} - {{ movimentacao.descricao }} - {{ movimentacao.valor }} -
      <button @click="onRemove(movimentacao)">&#128686;</button>
    </li>
  </ul>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { computed, onMounted } from 'vue'

const mState = useMovimentacaoStore()

const onRemove = async (movimentacao) => {
  if (!confirm('Deseja realmente remover esta movimentação?')) return
  await mState.excluirMovimentacao(movimentacao)
  await mState.sincronizarMovimentacoes()
}

const movimentacoes = computed(() => mState.store?.movimentacoes.map(m => m) || [])

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
