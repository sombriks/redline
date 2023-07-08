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
      <option v-for="conta in contaState.store.contas" :key="conta.id" :value="conta">
        {{ conta.descricao }}
      </option></select
    ><br />
    <select v-model="novaMovimentacao.categoria">
      <option :value="null">Selecione uma categoria</option>
      <option
        v-for="categoria in categoriaState.store.categorias"
        :key="categoria.id"
        :value="categoria"
      >
        {{ categoria.descricao }}
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
import { useCategoriaStore } from '@/stores/categoriaStore'

const mState = useMovimentacaoStore()
const contaState = useContaStore()
const categoriaState = useCategoriaStore()

const novaMovimentacao = reactive({
  tipo: null,
  conta: null,
  categoria: null,
  descricao: '',
  valor: 0
})

const salvarMovimentacao = async () => {
  await mState.salvarMovimentacao({
    descricao: novaMovimentacao.descricao,
    valor: novaMovimentacao.valor,
    conta_id: novaMovimentacao.conta?.id,
    tipo_movimentacao_id: novaMovimentacao.tipo?.id,
    categoria_id: novaMovimentacao.categoria?.id
  })
  await contaState.sincronizarContas()
  await mState.sincronizarMovimentacoes()
  await categoriaState.sincronizarCategorias()
}

onMounted(async () => {
  await categoriaState.sincronizarCategorias()
  await contaState.sincronizarContas()
  await mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
