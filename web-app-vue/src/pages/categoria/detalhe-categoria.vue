<template>
  <chip-categoria :categoria="categoria" v-if="!edit" @click="edit = !edit"></chip-categoria>
  <v-card v-if="edit" elevation="24" min-width="300px" class="ma-2">
    <v-form v-model="valid" @submit.prevent.stop="doEdit">
      <v-color-picker v-model="catEdit.cor"></v-color-picker>
      <v-text-field :rules="[requiredRule('Descrição obrigatória')]" v-model="catEdit.descricao" label="Nome"></v-text-field>
      <v-container>
        <v-row align="center">
          <v-btn
            class="ma-2"
            variant="outlined"
            color="green"
            type="submit"
            icon="mdi-check"
          ></v-btn>
          <v-spacer v-if="!catEdit.id"></v-spacer>
          <v-btn
            variant="outlined"
            color="orange"
            class="ma-2"
            type="button"
            @click="edit = !edit"
            icon="mdi-close"
          ></v-btn>
          <v-spacer v-if="catEdit.id"></v-spacer>
          <v-btn
            v-if="catEdit.id"
            variant="outlined"
            color="red"
            class="ma-2"
            type="button"
            @click="emit('onRemove', catEdit)"
            icon="mdi-trash-can-outline"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { requiredRule } from '@/services/basic-rules'
import ChipCategoria from '@/controls/chip-categoria.vue'

const props = defineProps(['categoria'])
const emit = defineEmits(['onRemove', 'onEdit'])

const edit = ref(false)

const catEdit = reactive({ ...props.categoria })
const valid = ref(false)

const doEdit = () => {
  if (!valid.value) return
  emit('onEdit', catEdit)
  edit.value = false
}
</script>
