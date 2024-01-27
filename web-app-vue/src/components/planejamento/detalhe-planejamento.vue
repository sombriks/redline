<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    color="green-accent-2"
    append-icon="mdi-playlist-plus"
    class="ma-2"
    size="x-large"
  >
    Novo planejamento
  </v-chip>
</template>
<style scoped></style>
<script setup>
import { ref } from 'vue'

const edit = ref(false)
</script>
