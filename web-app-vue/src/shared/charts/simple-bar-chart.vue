<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ title }}</h3>
    <svg v-if="data?.length" width="100%" :height="height">
      <rect
        v-for="(e, i) in data"
        :key="'data-' + i"
        stroke-width="2px"
        fill-opacity="60%"
        ry="25%"
        rx="3%"
        x="0"
        :y="`${i * (100 / data.length)}%`"
        :width="`${(100 * e.value) / biggest}%`"
        :height="`${100 / data.length}%`"
        :stroke="e.color"
        :fill="e.color"
      />
    </svg>
    <p v-if="!data?.length">
      Sem dados para exibir
    </p>
    <div v-for="(e, i) in data" :key="'label-' + i">
      <i v-if="legenda" :style="{ color: e.color }">{{ e.label }}: {{ e.value }}</i>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['title', 'height', 'data'])
const biggest = computed(() => Math.max(...props.data.map((e) => e.value)))
const legenda = ref(true)
</script>
