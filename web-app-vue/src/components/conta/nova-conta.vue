<template>
  <form @submit.prevent.stop="doSave">
    <input v-model="descricao" required placeholder="Descrição" />
    <button type="submit">Salvar</button>
  </form>
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { ref } from 'vue'

const contaStore = useContaStore()

const descricao = ref('')
const doSave = () => {
  contaStore.salvarConta({ descricao: descricao.value })
}
</script>
<style scoped></style>