<template>
  <div>Configurações
    <button @click="logout()">Desconectar</button>
  </div>
</template>
<script setup>

import { useUserStore } from "@/stores/userStore";

const uStore = useUserStore();
const logout = () => {
  uStore.logout();
};
</script>
<style scoped></style>
