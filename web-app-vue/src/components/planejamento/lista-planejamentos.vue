<template>
  <v-container fluid>
    <detalhe-planejamento/>
    <v-btn
        variant="outlined"
        rounded="rounded-circle"
        @click="drawer = !drawer"
        icon="mdi-dots-vertical"
    ></v-btn>
    <v-divider></v-divider>
  </v-container>
</template>
<style scoped></style>
<script setup>
import DetalhePlanejamento from "@/components/planejamento/detalhe-planejamento.vue";
</script>
