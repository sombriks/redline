<template>
  <form @submit.stop.prevent="salvarMovimentacao()">
    <select required v-model="novaMovimentacao.tipo">
      <option :value="null">Selecione um tipo</option>
      <option v-for="tipo in mState.store.tiposMovimentacao" :key="tipo.id" :value="tipo">
        {{ tipo.descricao }}
      </option></select
    ><br />
    <select required v-model="novaMovimentacao.conta">
      <option :value="null">Selecione uma conta</option>
      <option v-for="conta in cState.store.contas" :key="conta.id" :value="conta">
        {{ conta.descricao }}
      </option></select
    ><br />
    <input required placeholder="descrição" v-model="novaMovimentacao.descricao" /><br />
    <input required placeholder="valor" v-model="novaMovimentacao.valor" />
    <button type="submit">salvar</button>
  </form>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted, reactive } from 'vue'
import { useContaStore } from '@/stores/contaStore'

const mState = useMovimentacaoStore()
const cState = useContaStore()

const novaMovimentacao = reactive({
  tipo: null,
  conta: null,
  descricao: '',
  valor: 0
})

const salvarMovimentacao = async () => {
  await mState.salvarMovimentacao({
    descricao: novaMovimentacao.descricao,
    valor: novaMovimentacao.valor,
    conta_id: novaMovimentacao.conta?.id,
    tipo_conta_id: novaMovimentacao?.tipo.id
  })
  await cState.sincronizarContas()
  await mState.sincronizarMovimentacoes()
}

onMounted(async () => {
  await cState.sincronizarContas()
  await mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
