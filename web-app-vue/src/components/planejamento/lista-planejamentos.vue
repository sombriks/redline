<template>
  <v-container fluid>
    <detalhe-planejamento @onSave="savePlanejamento" />
    <v-btn
      variant="outlined"
      rounded="rounded-circle"
      @click="drawer = !drawer"
      icon="mdi-dots-vertical"
    ></v-btn>
    <v-divider></v-divider>
    <p v-if="planejamentos.length === 0">Não há planejamentos para exibir</p>
    <detalhe-planejamento
      v-for="plan in planejamentos"
      :key="plan.id"
      :planejamento="plan"
      @onSave="savePlanejamento"
      @onDel="delPlanejamento"
    />
    <v-navigation-drawer v-model="drawer" location="bottom" temporary></v-navigation-drawer>
  </v-container>
</template>
<style scoped></style>
<script setup>
import DetalhePlanejamento from '@/components/planejamento/detalhe-planejamento.vue'
import { computed, onMounted, ref } from 'vue'
import { usePlanejamentoStore } from '@/stores/planejamentoStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const drawer = ref(false)

// const filtros = reactive({})

const planejamentoStore = usePlanejamentoStore()
const categoriaStore = useCategoriaStore()

const planejamentos = computed(() => {
  return planejamentoStore.store.planejamentos || []
})

onMounted(async () => {
  await Promise.all([
    planejamentoStore.sincronizarPlanejamentos(),
    categoriaStore.sincronizarCategorias()
  ])
})

const savePlanejamento = async (planejamento) => {
  await planejamentoStore.salvaPlanejamento(planejamento)
  await planejamentoStore.sincronizarPlanejamentos()
}

const delPlanejamento = async (planejamento) => {
  if (confirm('Deseja realmente excluir este planejamento?')) {
    await planejamentoStore.excluirPlanejamento(planejamento.id)
    await planejamentoStore.sincronizarPlanejamentos()
  }
}
</script>
