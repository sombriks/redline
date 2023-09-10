<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { router } from '@/routes/router'

const userStore = useUserStore()
const menu = [
  { label: 'Nova movimentação', icon: 'mdi-currency-usd', path: '/nova-movimentacao' },
  { label: 'Contas', icon: 'mdi-card-account-details', path: '/contas' },
  { label: 'Categorias', icon: 'mdi-playlist-check', path: '/categorias' },
  { label: 'Histórico', icon: 'mdi-clipboard-text-search-outline', path: '/historico' },
  { label: 'Planejamento', icon: 'mdi-clipboard-edit-outline', path: '/planejamento' },
  { label: 'Recorrências', icon: 'mdi-history', path: '/recorrencias' },
  { label: 'Configurações', icon: 'mdi-cog-outline', path: '/config' }
]
const show = ref(false)
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar :collapse="!show" v-if="userStore.store.token">
      <template v-slot:prepend>
        <v-app-bar-nav-icon icon="mdi-pulse" color="red" @click="show = !show"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title><span class="red">redline</span></v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-if="userStore.store.token" v-model="show">
      <v-list>
        <v-list-item v-for="m in menu" :key="m.label" :active="m.path == $route.path">
          <template v-slot:prepend>
            <v-icon color="red-lighten-3" :icon="m.icon"></v-icon>
          </template>
          <v-list-item-title>
            <router-link :to="m.path">{{ m.label }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped>
.red {
  color: red;
}
</style>
