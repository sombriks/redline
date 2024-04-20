<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height" viewBox="-10 -10 20 20">
      <path
        d="
          M 0 0
          L 0 -10
          A 10 10 0 0 1 0 10
          A 10 10 0 0 1 0 -10
          L 0 0"
        fill="red"
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
