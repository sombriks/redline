<template>
  <v-chip
    rounded
    variant="outlined"
    :color="props.categoria?.cor || 'green-accent-2'"
    class="ma-2"
    size="x-large"
    :append-icon="props.categoria?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
  >
    {{ props.categoria?.descricao }}
  </v-chip>
</template>
<script setup>
const props = defineProps(["categoria"])
</script>
