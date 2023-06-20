<template>
  <ul v-if="cState.store.contas && cState.store.contas.length">
    <li v-for="conta in cState.store.contas" :key="conta.id">
      {{ conta.descricao }}
    </li>
  </ul>
  <div v-else>Não há contas para visualizar</div>
</template>
<script setup>
import { useContaStore } from "@/stores/contaStore";
import { onMounted } from "vue";

const cState = useContaStore();

onMounted(() => {
  cState.sincronizar();
});
</script>
<style scoped></style>
