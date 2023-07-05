<template>
  <li>
    <span v-if="!edit" @click="edit = !edit">
      {{ props.categoria.descricao }}
      <button @click="emit('onRemove', props.categoria)">&#128686;</button>
    </span>
    <form v-if="edit" @submit.prevent.stop="doEdit">
      <input required placeholder="Descrição" v-model="catEdit.descricao" />
      <button type="submit">&#9989;</button>
      <button type="button" @click="edit = !edit">&#10060;</button>
    </form>
  </li>
</template>
<script setup>
import { reactive, ref } from 'vue'

const props = defineProps(['categoria'])
const emit = defineEmits(['onRemove', 'onEdit'])

const edit = ref(false)

const catEdit = reactive({ descricao: props.categoria.descricao })

const doEdit = () => {
  emit('onEdit', {
    ...props.categoria,
    descricao: catEdit.descricao
  })
  edit.value = false
}
</script>
