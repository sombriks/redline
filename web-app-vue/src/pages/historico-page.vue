<script setup>
import ListaMovimentacoes from '@/components/movimentacao/lista-movimentacoes.vue'
</script>

<template>
  <v-card elevation="24" title="Histórico">
    <v-container>
      <v-row>
        <lista-movimentacoes></lista-movimentacoes>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped></style>
