<script setup>
import { useCardState } from "@/stores/cardState";
import CardOption from "@/components/CardOption.vue";
import CardLogin from "@/components/usuario/card-login.vue";
import NovaMovimentacao from "@/components/movimentacao/nova-movimentacao.vue";
import ListaCategorias from "@/components/categoria/lista-categorias.vue";
import ListaPlanejamentos from "@/components/planejamento/lista-planejamentos.vue";
import ListaCarteiras from "@/components/carteira/lista-carteiras.vue";
import CardConfiguracoes from "@/components/configuracoes/card-configuracoes.vue";

const cState = useCardState();

</script>

<template>
  <div class="container">
    <h1>Redline</h1>
    <card-option :title="'Login'"
                 :active="cState.activeCard.login"
                 @onActive="e => cState.toggleCard('login', e)">
      <CardLogin></CardLogin>
    </card-option>
    <card-option :title="'Movimentação'"
                 :active="cState.activeCard.movimentacao"
                 @onActive="e => cState.toggleCard('movimentacao', e)">
      <nova-movimentacao></nova-movimentacao>
    </card-option>
    <card-option :title="'Categorias'"
                 :active="cState.activeCard.categorias"
                 @onActive="e => cState.toggleCard('categorias', e)">
      <lista-categorias></lista-categorias>
    </card-option>
    <card-option :title="'Planejamento'"
                 :active="cState.activeCard.planejamentos"
                 @onActive="e => cState.toggleCard('planejamentos', e)">
      <lista-planejamentos></lista-planejamentos>
    </card-option>
    <card-option :title="'Carteiras'"
                 :active="cState.activeCard.carteirasContas"
                 @onActive="e => cState.toggleCard('carteirasContas', e)">
      <lista-carteiras></lista-carteiras>
    </card-option>
    <card-option :title="'Configurações'"
                 :active="cState.activeCard.configuracoes"
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
