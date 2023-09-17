<template>
  <v-container fluid>
    <v-row align="center">
      <h1>Categorias</h1>
    </v-row>
    <v-row align="center">
      <detalhe-categoria :categoria="novaCategoria" @onEdit="salvar"></detalhe-categoria>
      <v-btn variant="outlined" rounded @click="drawer = !drawer" size="large">
        <v-icon icon="mdi-dots-vertical"/>
      </v-btn>
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
  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
  >
  </v-navigation-drawer>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useCategoriaStore} from '@/stores/categoriaStore'
import DetalheCategoria from '@/components/categoria/detalhe-categoria.vue'

const cState = useCategoriaStore()

const drawer = ref(false)

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

onMounted(() => {
  cState.sincronizarCategorias()
})
</script>
<style scoped></style>
