<template>
  <v-chip
    rounded
    variant="outlined"
    :prepend-icon="contaIcon"
    :color="props.color || props.conta?.cor"
    :append-icon="props.appendIcon"
    >{{ props.conta?.descricao }}
  </v-chip>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['conta', 'color', 'appendIcon'])

const contaIcon = computed(() => {
  if (props.conta?.tipo_conta_id == '2') return 'mdi-bank'
  if (props.conta?.tipo_conta_id == '3') return 'mdi-credit-card'
  return 'mdi-wallet'
})
</script>
