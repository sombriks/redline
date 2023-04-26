<script setup>
import CardOption from "@/components/CardOption.vue";
import { reactive } from "vue";

const activeCard = reactive({
  login: false,
  movimentacao: false,
  categorias: false,
  planejamentos: false,
  carteirasContas: false,
  configuracoes: false
});
</script>

<template>
  <div class="container">
    <h1>Redline</h1>
    <card-option title="Login" :active="activeCard.login"></card-option>
    <card-option title="Movimentação" :active="activeCard.movimentacao"></card-option>
    <card-option title="Categorias" :active="activeCard.categorias"></card-option>
    <card-option title="Planejamentos" :active="activeCard.planejamentos"></card-option>
    <card-option title="Carteiras/Contas" :active="activeCard.carteirasContas"></card-option>
    <card-option title="Configurações" :active="activeCard.configuracoes"></card-option>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 480px;
}
</style>
