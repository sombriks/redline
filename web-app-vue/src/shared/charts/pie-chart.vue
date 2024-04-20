<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height" viewBox="0 0 20 20">
      <circle
        v-for="(e, i) in data"
        :key="'data' + i"
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        :stroke="e.color"
        stroke-width="10"
        :stroke-dasharray="`calc(${reduz(i, data)} * 31.4 / 100) 31.4`"
        transform="rotate(-90) translate(-20)"
      />
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
