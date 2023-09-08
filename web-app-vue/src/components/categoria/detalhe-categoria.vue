<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    class="ma-2"
    size="x-large"
    append-icon="mdi-playlist-edit"
    @click="edit = !edit"
  >
    {{ catEdit.descricao }}
  </v-chip>
  <v-card v-if="edit" elevation="24" min-width="300px" class="ma-2">
    <v-form v-model="valid" @submit.prevent.stop="doEdit">
      <v-text-field :rules="[requiredRule]" v-model="catEdit.descricao" label="Nome"></v-text-field>
      <v-container>
        <v-row align="center">
          <v-btn class="ma-2" type="submit">Salvar</v-btn>
          <v-btn variant="tonal" class="ma-2" type="button" @click="edit = !edit">Cancelar</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
  <!--  <li>-->
  <!--    <span v-if="!edit" @click="edit = !edit">-->
  <!--      {{ props.categoria.descricao }}-->
  <!--      <button @click="emit('onRemove', props.categoria)">&#128686;</button>-->
  <!--    </span>-->
  <!--    <form v-if="edit" @submit.prevent.stop="doEdit">-->
  <!--      <input required placeholder="Descrição" v-model="catEdit.descricao" />-->
  <!--      <button type="submit">&#9989;</button>-->
  <!--      <button type="button" @click="edit = !edit">&#10060;</button>-->
  <!--    </form>-->
  <!--  </li>-->
</template>
<script setup>
import { reactive, ref } from 'vue'
import { requiredRule } from '@/form-rules/basic-rules'

const props = defineProps(['categoria'])
const emit = defineEmits(['onRemove', 'onEdit'])

const edit = ref(false)

const catEdit = reactive({ ...props.categoria })
const valid = ref(false)

const doEdit = () => {
  if (!valid.value) return
  emit('onEdit', {
    ...props.categoria,
    descricao: catEdit.descricao
  })
  edit.value = false
}
</script>
