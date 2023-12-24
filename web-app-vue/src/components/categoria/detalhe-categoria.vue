<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    :color="props.categoria?.cor || 'green-accent-2'"
    class="ma-2"
    size="x-large"
    :append-icon="props.categoria.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="edit = !edit"
  >
    {{ props.categoria.descricao }}
  </v-chip>
  <v-card v-if="edit" elevation="24" min-width="300px" class="ma-2">
    <v-form v-model="valid" @submit.prevent.stop="doEdit">
      <v-color-picker v-model="catEdit.cor"></v-color-picker>
      <v-text-field :rules="[requiredRule]" v-model="catEdit.descricao" label="Nome"></v-text-field>
      <v-container>
        <v-row align="center">
          <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
          <v-spacer v-if="!catEdit.id"></v-spacer>
          <v-btn
            variant="tonal"
            color="orange"
            class="ma-2"
            type="button"
            @click="edit = !edit"
            icon="mdi-close"
          ></v-btn>
          <v-spacer v-if="catEdit.id"></v-spacer>
          <v-btn
            v-if="catEdit.id"
            variant="tonal"
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
import { reactive, ref } from "vue";
import { requiredRule } from '@/services/basic-rules'

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
