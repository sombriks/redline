<template>
  <v-container fluid>
    <detalhe-recorrencia @onSave="doSave"></detalhe-recorrencia>
    <v-divider></v-divider>
    <p v-if="recorrencias.length === 0">Não há recorrencias para exibir</p>
    <detalhe-recorrencia
      v-for="recorrencia in recorrencias"
      :key="recorrencia.id"
      :recorrencia="recorrencia"
      @onSave="doSave"
      @onDel="doDel"
    ></detalhe-recorrencia>
  </v-container>
</template>
<script setup>
import { useRecorrenciaStore } from '@/stores/recorrenciaStore'
import DetalheRecorrencia from '@/components/recorrencia/detalhe-recorrencia.vue'
import { computed, onMounted } from 'vue'
import { useCategoriaStore } from '@/stores/categoriaStore'

const recorrenciaStore = useRecorrenciaStore()
const categoriaStore = useCategoriaStore()

const recorrencias = computed(() => {
  return recorrenciaStore.store.recorrencias || []
})

const doSave = async (rec) => {
  await recorrenciaStore.salvarRecorrencia(rec)
}

const doDel = async (rec) => {
  if (confirm('Deseja realmente excluir esta recorrência?')) {
    await recorrenciaStore.excluirRecorrencia(rec.id)
  }
}

onMounted(async () =>
  await Promise.all([
    recorrenciaStore.sincronizarRecorrencia(),
    categoriaStore.sincronizarCategorias()
  ])
)
</script>
