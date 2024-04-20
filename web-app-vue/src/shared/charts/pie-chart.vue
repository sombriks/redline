<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height" viewBox="0 0 20 20">
      <!-- M cx cy L x0 y0 A rx ry rotation large-arc-flag sweep-flag x1 y1 -->
      <path d="M 10 10 L 10 0 A 10 10 0 0 1 10 20" fill="red"/>
      <path d="M 10 10 L 10 20 A 10 10 0 0 1 10 0" fill="red"/>
    </svg>
    <div v-for="(e, i) in data" :key="'label-' + i">
      <i v-if="legenda" :style="{ color: e.color }">{{ e.label }} - {{ e.value }}</i>
    </div>
    <br />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['title', 'height', 'data'])
const legenda = ref(true)

const biggest = computed(() => Math.max(...props.data.map((e) => e.value)))

const reduz = (i, arr) => {
  arr = [...arr.map((e) => (100 * e.value) / biggest.value)]
  console.log(arr, i)
  while (i-- > 0) arr.shift()
  return arr.reduce((acc, e) => acc + e, 0)
}
</script>
