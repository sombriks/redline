<template>
  <v-autocomplete
      v-model="categoriaId"
      :items="categoriaState.store.categorias"
      :rules="props.rules"
      item-title="descricao"
      item-value="id"
      label="Categoria"
      chips
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" variant="outlined" rounded :color="item.raw.cor">{{
          item.raw.descricao
        }}</v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item>
        <v-chip
            class="ma-2"
            v-bind="props"
            variant="outlined"
            rounded
            :color="item.raw.cor"
        >
          {{ item.raw.descricao }}
        </v-chip>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
<script setup>
import { ref, watch } from 'vue'
import {useCategoriaStore} from "@/stores/categoriaStore";

const categoriaState = useCategoriaStore()
const props = defineProps(['modelValue', 'rules'])
const emit = defineEmits(['update:modelValue'])

const categoriaId = ref(props.modelValue)

watch(categoriaId, () => emit("update:modelValue", categoriaId))
watch(props, () => {
  categoriaId.value = props.modelValue
  // console.log(categoriaId)
  // console.log(props.modelValue)
  // XXX needs minor fixes
})
</script>
