<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg v-if="groups?.length" width="100%" :height="height">
      <rect
        stroke-width="2px"
        width="100%"
        :height="100 / groups.length"
        fill-opacity="60%"
        color="gray"
        ry="25%"
        rx="3%"
        x="0"
      />
    </svg>
    <p v-if="!groups?.length">Sem dados para exibir</p>
    <div v-for="(e, i) in groups" :key="'label-' + i">
      <fieldset v-if="legenda">
        <legend>{{ e.label }}</legend>
        <div v-for="(j, k) in e.data" :key="`label-${i}-${k}`">
          <i :style="{ color: j.color }">{{ j.label }}: {{ j.value }}</i>
        </div>
      </fieldset>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'height', 'groups']) // groups -> [{label,data:[]},]

const legenda = ref(true)
</script>
<style scoped></style>
