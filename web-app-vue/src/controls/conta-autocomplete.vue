<template>
  <v-autocomplete
    v-model="contaId"
    :items="contaState.store.contas"
    :rules="props.rules"
    item-title="descricao"
    item-value="id"
    label="Conta"
    chips
  >
    <template v-slot:chip="{ props, item }">
      <chip-conta v-bind="props" :conta="item.raw" :color="item.raw.cor"></chip-conta>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item>
        <chip-conta
          class="ma-2"
          v-bind="props"
          :conta="item.raw"
          :color="item.raw.cor"
        ></chip-conta>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useContaStore } from '@/stores/contaStore'
import ChipConta from '@/controls/chip-conta.vue'

const contaState = useContaStore()
const props = defineProps(['modelValue', 'rules'])
const emit = defineEmits(['update:modelValue'])

const contaId = ref(props.modelValue)
// const rules = ref(props.rules)

watch(contaId, () => emit('update:modelValue', contaId))

watch(props, () => {
  contaId.value = props.modelValue
  // XXX needs minor fixes
})
</script>
