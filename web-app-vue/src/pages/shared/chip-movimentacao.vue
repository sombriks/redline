<template>
  <v-chip variant="outlined" rounded @click="onClick"
    >{{ props.movimentacao?.descricao }} {{ props.movimentacao?.valor }}</v-chip
  >
</template>
<script setup>
const props = defineProps(['movimentacao'])
const emit = defineEmits(['click'])

const onClick = () => emit('click')
</script>
<style scoped></style>
