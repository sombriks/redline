<script setup>
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore()
const menu = [
  { label: 'Nova movimentação', icon: 'mdi-currency-usd', path: '/nova-movimentacao' },
  { label: 'Contas', icon: 'mdi-card-account-details', path: '/contas' },
  { label: 'Categorias', icon: 'mdi-playlist-check', path: '/categorias' },
  { label: 'Histórico', icon: 'mdi-clipboard-text-search-outline', path: '/movimentacoes' },
  { label: 'Planejamento', icon: 'mdi-clipboard-edit-outline', path: '/planejamento' },
  { label: 'Recorrências', icon: 'mdi-history', path: '/recorrencias' },
  { label: 'Configurações', icon: 'mdi-cog-outline', path: '/config' },
]
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation v-if="userStore.store.token" :elevation="24" active bg-color="black" mode="shift">
      <router-link v-for="m in menu" :key="m.label" :to="m.path">
        <v-btn :value="m.label">
          <v-icon>{{m.icon}}</v-icon>
          <span>{{m.label}}</span>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped></style>
