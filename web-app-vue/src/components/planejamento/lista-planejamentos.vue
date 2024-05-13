<template>
  <v-container fluid>
    <v-row align="center">
      <detalhe-planejamento @onSave="savePlanejamento" />
      <v-btn
        variant="outlined"
        rounded="rounded-circle"
        @click="drawer = !drawer"
        icon="mdi-dots-vertical"
      ></v-btn>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center">
      <p v-if="planejamentos.length === 0">Não há planejamentos para exibir</p>
      <detalhe-planejamento
        v-for="plan in planejamentos"
        :key="`${plan.id}-${plan.alteracao}`"
        :planejamento="plan"
        @onSave="savePlanejamento"
        @onDel="delPlanejamento"
      />
    </v-row>
  </v-container>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-radio-group label="Tipo de movimentação"
                   v-model="filtros.tipo_movimentacao_id" inline>
      <v-radio :value="null" label="Todas"></v-radio>
      <v-radio :value="1" label="Entrada"></v-radio>
      <v-radio :value="2" label="Saída"></v-radio>
    </v-radio-group>
  </v-navigation-drawer>
</template>
<script setup>
import DetalhePlanejamento from '@/components/planejamento/detalhe-planejamento.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { usePlanejamentoStore } from '@/stores/planejamentoStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const drawer = ref(false)

const filtros = reactive({
  tipo_movimentacao_id: null
})

const planejamentoStore = usePlanejamentoStore()
const categoriaStore = useCategoriaStore()

const planejamentos = computed(() => {
  const planejamentos = planejamentoStore.store.planejamentos || []
  return planejamentos.filter(p => filtros.tipo_movimentacao_id != null ?
    filtros.tipo_movimentacao_id === p.tipo_movimentacao_id : true
  )
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
  filtros.tipo_movimentacao_id = null
}

const delPlanejamento = async (planejamento) => {
  if (confirm('Deseja realmente excluir este planejamento?')) {
    await planejamentoStore.excluirPlanejamento(planejamento.id)
    await planejamentoStore.sincronizarPlanejamentos()
    filtros.tipo_movimentacao_id = null
  }
}
</script>
<style scoped>
</style>
