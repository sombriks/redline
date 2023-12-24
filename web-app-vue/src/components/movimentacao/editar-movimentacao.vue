<template>
  <div>Editar Movimentação {{props.movimentacao?.id}}</div>
</template>
<script setup>
import { useMovimentacaoStore } from "@/stores/movimentacaoStore";

const props = defineProps((["movimentacao"]))
const movimentacaoStore = useMovimentacaoStore()
</script>
<style scoped></style>
