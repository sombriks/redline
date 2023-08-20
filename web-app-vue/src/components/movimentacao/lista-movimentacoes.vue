<template>
  <ul>
    <detalhe-movimentacao
      v-for="movimentacao in movimentacoes"
      :key="movimentacao.id"
      :movimentacao="movimentacao"
      @onRemove="onRemove"
      @onUpdate="onUpdate"
    ></detalhe-movimentacao>
  </ul>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import DetalheMovimentacao from '@/components/movimentacao/detalhe-movimentacao.vue'

const mState = useMovimentacaoStore()

const onRemove = async (movimentacao) => {
  if (!confirm('Deseja realmente remover esta movimentação?')) return
  await mState.excluirMovimentacao(movimentacao)
  await mState.sincronizarMovimentacoes()
}

const onUpdate = async (movimentacao) => {
  await mState.salvarMovimentacao(movimentacao)
  await mState.sincronizarMovimentacoes()
}

const movimentacoes = computed(() => mState.store?.movimentacoes.map((m) => m) || [])

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
