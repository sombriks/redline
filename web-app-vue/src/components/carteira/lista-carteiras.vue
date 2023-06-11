<template>
  <div>Carteiras</div>
  <ul v-if="cState.store.carteiras">
    <li v-for="carteira in cState.store.carteiras" :key="carteira.id">
      {{carteira.descricao}}
    </li>
  </ul>
</template>
<script setup>
import { useCarteiraStore } from "@/stores/carteiraStore";
import { onMounted } from "vue";

const cState = useCarteiraStore()

onMounted(() =>{
  cState.sincronizar()
})
</script>
<style scoped></style>
