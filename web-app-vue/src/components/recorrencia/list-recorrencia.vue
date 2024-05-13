<template>
  <v-container fluid>
    <v-row align="center">
      <detalhe-recorrencia @onSave="doSave"></detalhe-recorrencia>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <p v-if="recorrencias.length === 0">Não há recorrencias para exibir</p>
      <detalhe-recorrencia
        v-for="recorrencia in recorrencias"
        :key="recorrencia.id"
        :recorrencia="recorrencia"
        @onSave="doSave"
        @onDel="doDel"
      ></detalhe-recorrencia>
    </v-row>
  </v-container>
</template>
<script setup>
import { useRecorrenciaStore } from '@/stores/recorrenciaStore'
import DetalheRecorrencia from '@/components/recorrencia/detalhe-recorrencia.vue'
import { computed, onMounted } from 'vue'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { useContaStore } from '@/stores/contaStore'

const recorrenciaStore = useRecorrenciaStore()
const categoriaStore = useCategoriaStore()
const contaStore = useContaStore()

const recorrencias = computed(() => {
  return recorrenciaStore.store.recorrencias || []
})

const doSave = async (rec) => {
  await recorrenciaStore.salvarRecorrencia(rec)
  if(rec.id && confirm("deseja gerar os lançamentos da recorrência novamente?")) {
    await recorrenciaStore.gerarLancamentos(rec)
  }
}

const doDel = async (rec) => {
  if (confirm('Deseja realmente excluir esta recorrência?')) {
    await recorrenciaStore.excluirRecorrencia(rec.id)
  }
}

onMounted(async () =>
  await Promise.all([
    recorrenciaStore.sincronizarRecorrencia(),
    categoriaStore.sincronizarCategorias(),
    contaStore.sincronizarContas()
  ])
)
</script>
