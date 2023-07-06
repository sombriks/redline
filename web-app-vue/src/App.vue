<script setup>
import CardOption from "@/components/CardOption.vue";
import CardLogin from "@/components/usuario/card-login.vue";
import NovaMovimentacao from "@/components/movimentacao/nova-movimentacao.vue";
import ListaMovimentacoes from "@/components/movimentacao/lista-movimentacoes.vue";
import ListaCategorias from "@/components/categoria/lista-categorias.vue";
import ListaPlanejamentos from "@/components/planejamento/lista-planejamentos.vue";
import NovaCarteira from "@/components/conta/nova-conta.vue";
import ListaCarteiras from "@/components/conta/lista-contas.vue";
import CardConfiguracoes from "@/components/configuracoes/card-configuracoes.vue";
import { useCardStore } from "@/stores/cardStore";
import { useUserStore } from "@/stores/userStore";

const cState = useCardStore();
const uState = useUserStore();

</script>

<template>
  <div class="container">
    <h1>Redline</h1>
    <card-option v-if="!uState.store.token"
                 :title="'Login'"
                 :active="cState.store.activeCard.login"
                 @onActive="e => cState.toggleCard('login', e)">
      <CardLogin></CardLogin>
    </card-option>
    <card-option v-if="uState.store.token"
                 :title="'Movimentação'"
                 :active="cState.store.activeCard.movimentacao"
                 @onActive="e => cState.toggleCard('movimentacao', e)">
      <nova-movimentacao></nova-movimentacao>
      <lista-movimentacoes></lista-movimentacoes>
    </card-option>
    <card-option v-if="uState.store.token"
                 :title="'Carteiras e contas'"
                 :active="cState.store.activeCard.carteirasContas"
                 @onActive="e => cState.toggleCard('carteirasContas', e)">
      <nova-carteira></nova-carteira>
      <lista-carteiras></lista-carteiras>
    </card-option>
    <card-option v-if="uState.store.token"
                 :title="'Categorias'"
                 :active="cState.store.activeCard.categorias"
                 @onActive="e => cState.toggleCard('categorias', e)">
      <lista-categorias></lista-categorias>
    </card-option>
    <card-option v-if="uState.store.token"
                 :title="'Planejamento'"
                 :active="cState.store.activeCard.planejamentos"
                 @onActive="e => cState.toggleCard('planejamentos', e)">
      <lista-planejamentos></lista-planejamentos>
    </card-option>
    <card-option v-if="uState.store.token"
                 :title="'Configurações'"
                 :active="cState.store.activeCard.configuracoes"
                 @onActive="e => cState.toggleCard('configuracoes', e)">
      <card-configuracoes></card-configuracoes>
    </card-option>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 480px;
    border-radius: 2em;
    overflow: hidden;
}
</style>
