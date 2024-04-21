<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg v-if="data?.length" width="100%" :height="height">
    </svg>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'height', 'groups']) // groups -> [{label,data:[]},]

const legenda = ref(true)

</script>
<style scoped>

</style>
