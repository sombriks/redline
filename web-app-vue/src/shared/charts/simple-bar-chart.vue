<template>
  <div style="width: 100%">
    <h3>{{ title }}</h3>
    <svg width="100%" :height="height">
      <rect
        v-for="(e, i) in data"
        :key="'data-' + i"
        x="0"
        :y="`${i * (100 / data.length)}%`"
        :width="`${(100 * e.value) / biggest}%`"
        :height="`${100 / data.length}%`"
        :fill="e.color"
        stroke-width="0"
      />
    </svg>
    <div v-for="(e, i) in data" :key="'label-' + i">
      <i :style="{ color: e.color }">{{ e.label }}: {{ e.value }}</i>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['title', 'height', 'data'])
const biggest = computed(() => Math.max(...props.data.map((e) => e.value)))
</script>
