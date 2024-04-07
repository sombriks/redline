<template>
  <v-container fluid>
    <v-row align="center">
      <detalhe-categoria :categoria="novaCategoria" @onEdit="salvar"></detalhe-categoria>
      <v-divider></v-divider>
      <detalhe-categoria
          @onEdit="salvar"
          @onRemove="remover"
          v-for="cat in cState.store.categorias"
          :key="cat.id"
          :categoria="cat"
      ></detalhe-categoria>
    </v-row>
  </v-container>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useCategoriaStore} from '@/stores/categoriaStore'
import DetalheCategoria from '@/components/categoria/detalhe-categoria.vue'

const cState = useCategoriaStore()

const novaCategoria = reactive({descricao: 'Nova Categoria'})

const remover = async (categoria) => {
  if (!confirm('deseja realmente excluir esta categoria?')) return
  await cState.excluirCategoria(categoria)
  await cState.sincronizarCategorias()
}

const salvar = async (categoria) => {
  await cState.salvarCategoria({...categoria})
  await cState.sincronizarCategorias()
}

onMounted(async () => {
  await cState.sincronizarCategorias()
})
</script>
<style scoped></style>
