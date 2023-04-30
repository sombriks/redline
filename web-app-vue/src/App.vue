<script setup>
import CardOption from "@/components/CardOption.vue";
import { reactive } from "vue";
import LoginCard from "@/components/usuario/login-card.vue";

const activeCard = reactive({
  login: false,
  movimentacao: false,
  categorias: false,
  planejamentos: false,
  carteirasContas: false,
  configuracoes: false
});

const toggle = (k, v) => {
  Object.keys(activeCard).forEach(k => activeCard[k] = false);
  activeCard[k] = v;
};
</script>

<template>
  <div class="container">
    <h1>Redline</h1>
    <card-option :title="'Login'" :active="activeCard.login"
                 @onActive="e => toggle('login',e)">
      <login-card></login-card>
    </card-option>
    <card-option v-for="(item,key) in activeCard" :key="key" :title="key" :active="item"
                 @onActive="e => toggle(key,e)"></card-option>
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
