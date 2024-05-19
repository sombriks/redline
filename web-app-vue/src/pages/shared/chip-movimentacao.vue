<template>
  <v-chip @click="onClick"
    >{{ props.movimentacao?.descricao }} {{ props.movimentacao?.valor }}</v-chip
  >
</template>
<script setup>
const props = defineProps(['movimentacao'])
const emit = defineEmits(['click'])

const onClick = () => emit('click')
</script>
<style scoped></style>
