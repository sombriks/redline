<template>
  <form @submit.prevent.stop="doSave">
    <label
      >Tipo de conta
      <select v-model="tipo" required>
        <option v-for="t in contaStore.store.tiposConta" :key="t.id" :value="t.id">
          {{ t.descricao }}
        </option>
      </select>
    </label>
    <label
      >Descrição
      <input v-model="descricao" required placeholder="Descrição" />
    </label>
    <button type="submit">Salvar</button>
  </form>
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { ref } from 'vue'

const contaStore = useContaStore()

const descricao = ref('')
const tipo = ref(1)

const doSave = () => {
  contaStore.salvarConta({ descricao: descricao.value, tipo_conta_id: tipo.value })
  contaStore.sincronizarContas()
  descricao.value = ''
}
</script>
<style scoped></style>