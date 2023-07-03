<template>
  <ul>
    <li v-if="!cState.store.categorias || !cState.store.categorias.length">Não há categorias para exibir</li>
    <li v-for="cat in cState.store.categorias" :key="cat.id">{{cat.descricao}}</li>
  </ul>
</template>
<script setup>

import { useCategoriaStore } from "@/stores/categoriaStore";
import { onMounted } from "vue";

const cState = useCategoriaStore()

onMounted(() => {
  cState.sincronizarCategorias()
})
</script>
<style scoped></style>
