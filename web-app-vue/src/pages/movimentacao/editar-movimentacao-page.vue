<template>
  <editar-movimentacao :movimentacao="movimentacao"></editar-movimentacao>
</template>
<script setup>
import EditarMovimentacao from "@/pages/movimentacao/editar-movimentacao.vue";
import { useRoute } from "vue-router";
import { useMovimentacaoStore } from "@/stores/movimentacaoStore";
import { ref } from "vue";

const movimentacaoStore = useMovimentacaoStore()
const route = useRoute()

const movimentacao = ref(movimentacaoStore.getMovimentacao(route.params.id))
</script>
<style scoped></style>
