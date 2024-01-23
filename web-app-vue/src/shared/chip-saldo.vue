<template>
  <v-chip
    variant="outlined"
    class="ma-2"
    rounded
    size="large"
    :color="props.saldo >= 0 ? 'green-accent-2' : 'red-accent-2'"
    >{{props.label}} {{ prepareMoney(props.saldo) }}
  </v-chip>
</template>
<style></style>
<script setup>
import { prepareMoney } from '@/services/formaters'

const props = defineProps(['label', 'saldo'])
</script>
