<template>
  <li>
    <span v-if="!edit"> {{ props.conta.tipo.descricao }} - {{ props.conta.descricao }} </span>
    <form @submit.prevent.stop="doUpdate" v-if="edit">
      <select v-model="contaEdit.tipo" required>
        <option v-for="t in contaStore.store.tiposConta" :key="t.id" :value="t">
          {{ t.descricao }}
        </option>
      </select>
      <input v-model="contaEdit.descricao" />
      <button type="submit">&#9989;</button>
    </form>
    <button v-if="!edit" @click="edit = !edit">✏️</button>
    <button v-if="edit" @click="edit = !edit">&#10060;</button>
    <button v-if="!edit" @click="emit('onRemove', props.conta)">&#128686;</button>
  </li>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useContaStore } from '@/stores/contaStore'

// TODO props?
const contaStore = useContaStore()

const props = defineProps(['conta'])

const emit = defineEmits(['onRemove', 'onUpdate'])

const edit = ref(false)

const contaEdit = reactive({
  descricao: props.conta.descricao,
  tipo: props.conta.tipo
})

const doUpdate = async () => {
  emit('onUpdate', {
    ...props.conta, // spread and prepare for update
    tipo: undefined,
    descricao: contaEdit.descricao,
    tipo_conta_id: contaEdit.tipo.id
  })
  edit.value = !edit.value
}
</script>
<style scoped>
form {
  display: inline-block;
}
</style>
