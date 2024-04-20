<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ title }}</h3>
    <svg width="100%" :height="height">
      <rect
        v-for="(e, i) in data"
        :key="'data-' + i"
        ry="25%"
        rx="3%"
        stroke-width="0"
        x="0"
        :y="`${i * (100 / data.length)}%`"
        :width="`${(100 * e.value) / biggest}%`"
        :height="`${100 / data.length}%`"
        :fill="e.color"
      />
    </svg>
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
