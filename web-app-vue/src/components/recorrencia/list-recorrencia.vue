<template>
  <v-container fluid>
    <detalhe-recorrencia></detalhe-recorrencia>
    <v-divider></v-divider>
    <p v-if="recorrencias.length === 0">Não há recorrencias para exibir</p>
    <detalhe-recorrencia v-for="recorrencia in recorrencias" :recorrencia="recorrencia"></detalhe-recorrencia>
  </v-container>
</template>
<script setup>
  import {useRecorrenciaStore} from "@/stores/recorrenciaStore";
  import DetalheRecorrencia from "@/components/recorrencia/detalhe-recorrencia.vue";
  import {computed} from "vue";

  const recorrenciaStore = useRecorrenciaStore()

  const recorrencias = computed(() => {
    return recorrenciaStore.store.recorrencias || []
  })

</script>
