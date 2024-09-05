<template>
  <v-chip
    variant="outlined"
    class="ma-2"
    rounded
    size="large"
    :color="valor >= 0 ? 'green-accent-2' : 'red-accent-2'"
  >
    {{label}} &nbsp; {{ prepareMoney(valor) }}
  </v-chip>
</template>
<script setup>
import { prepareMoney } from '@/services/formatters'

defineProps(["label", "valor"])

</script>
