<template>
  <form @submit.stop.prevent="salvarMovimentacao()">
    <select v-model="novaMovimentacao.tipo">
      <option>Selecione uma conta</option>
      <option v-for="tipo in mState.store.tiposMovimentacao" :key="tipo.id" :value="tipo">
        {{ tipo.descricao }}
      </option>
    </select>
    <input placeholder="valor" />
    <button type="submit">salvar</button>
  </form>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { reactive } from 'vue'

const mState = useMovimentacaoStore()

const novaMovimentacao = reactive({
  tipo: { id: 2, descricao: 'SAIDA' }
})

const salvarMovimentacao = async () => {}
</script>
<style scoped></style>
