<template>
  <ul>
    <li>
      <form @submit.prevent.stop="salvarNova">
        <input v-model="novaCategoria.descricao" required placeholder="Nova categoria" />
        <button type="submit">Salvar</button>
      </form>
    </li>
    <li v-if="!cState.store.categorias || !cState.store.categorias.length">
      Não há categorias para exibir
    </li>
    <detalhe-categoria
      v-for="cat in cState.store.categorias"
      :key="cat.id"
      :categoria="cat"
      @onRemove="removeCategoria"
      @onEdit="editaCategoria"
    ></detalhe-categoria>
  </ul>
</template>
<script setup>
import { useCategoriaStore } from '@/stores/categoriaStore'
import { onMounted, reactive } from 'vue'
import DetalheCategoria from '@/components/categoria/detalhe-categoria.vue'

const cState = useCategoriaStore()

const novaCategoria = reactive({
  descricao: ''
})

const salvarNova = async () => {
  await cState.salvarCategoria({ ...novaCategoria })
  novaCategoria.descricao = ''
  await cState.sincronizarCategorias()
}

const removeCategoria = async (categoria) => {
  if (!confirm('deseja realmente excluir esta categoria?')) return
  await cState.excluirCategoria(categoria)
  await cState.sincronizarCategorias()
}

const editaCategoria = async (categoria) => {
  await cState.salvarCategoria(categoria)
  await cState.sincronizarCategorias()
}

onMounted(() => {
  cState.sincronizarCategorias()
})
</script>
<style scoped></style>
