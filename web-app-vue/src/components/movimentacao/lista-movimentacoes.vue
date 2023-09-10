<template>
  <v-list min-width="300px">
    <v-list-item v-for="movimentacao in movimentacoes" :key="movimentacao.id"
    :color="movimentacao.tipo_movimentacao_id == 1 ? 'green' : 'red'">
      <v-list-item-title>
        <span> {{ movimentacao.valor }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>{{ ajeitaData(movimentacao.vencimento) }}</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ movimentacao.descricao }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
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

const ajeitaData = (d) => {
  return d.split("T")[0]
}

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
