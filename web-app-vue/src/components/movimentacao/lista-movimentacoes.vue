<template>
  <v-list min-width="300px">
    <v-list-item v-for="movimentacao in movimentacoes" :key="movimentacao.id">
      <v-list-item-title>
<!--        <v-chip class="ma-2" variant="outlined" rounded>{{ ajeitaData(movimentacao.vencimento) }}</v-chip>-->
        <v-chip variant="outlined" class="ma-1" rounded :color="movimentacao.tipo_movimentacao_id == 1 ? 'green' : 'red'">
          R$ {{ movimentacao.valor }}</v-chip>
        <v-chip variant="outlined" class="ma-1" rounded>{{movimentacao.descricao}}</v-chip>
        <v-chip variant="outlined" class="ma-1" rounded :color="!!movimentacao.efetivada ? 'green' : 'red'">
          <v-icon :icon="!!movimentacao.efetivada ? 'mdi-check' : 'mdi-close'"/> </v-chip>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script setup>
import {computed, onMounted} from 'vue'
import {useMovimentacaoStore} from '@/stores/movimentacaoStore'
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
