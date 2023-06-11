<template>
  <ul v-if="cState.store.carteiras && cState.store.carteiras.length">
    <li v-for="carteira in cState.store.carteiras" :key="carteira.id">
      {{ carteira.descricao }}
    </li>
  </ul>
  <div v-else>Não há carteiras para visualizar</div>
</template>
<script setup>
import { useCarteiraStore } from "@/stores/carteiraStore";
import { onMounted } from "vue";

const cState = useCarteiraStore();

onMounted(() => {
  cState.sincronizar();
});
</script>
<style scoped></style>
