<template>
  <li>
    <span v-if="!edit" @click="edit = !edit">
      {{ props.conta.descricao }} - {{ props.conta.tipo.descricao }}
    </span>
    <form @submit.prevent.stop="doUpdate" v-if="edit">
      <input v-model="contaEdit.descricao" />
      -
      <select v-model="contaEdit.tipo" required>
        <option v-for="t in contaStore.store.tiposConta" :key="t.id" :value="t">
          {{ t.descricao }}
        </option>
      </select>
    </form>
    -
    <button @click="emit('onRemove', props.conta)">X</button>
  </li>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useContaStore } from "@/stores/contaStore";

// TODO props?
const contaStore = useContaStore()

const props = defineProps(['conta'])

const emit = defineEmits(['onRemove'])

const edit = ref(false)
const contaEdit = reactive({
  descricao: props.conta.descricao,
  tipo: props.conta.tipo
})

const doUpdate = async () => {

}
</script>
<style scoped></style>