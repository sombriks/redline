<template>
  <div>
    <h3>Receita x Despesa do período</h3>
    <svg width="100%" :height="props.height">
      <rect x="0" y="0" :width="`${width1}%`" height="50%" fill="lightgreen" stroke-width="0" />
      <rect x="0" y="50%" :width="`${width2}%`" height="50%" fill="red" stroke-width="0" />
      <text x="0" y="50%" font-weight="bold">{{props.value1}}</text>
      <text x="0" y="100%" font-weight="bold">{{props.value2}}</text>
    </svg>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['value1', 'value2', "height"])

const biggest = computed(() => Math.max(props.value1, props.value2))
const width1 = computed(() => (props.value1 / biggest.value) * 100)
const width2 = computed(() => (props.value2 / biggest.value) * 100)

const test = () => console.log('aaa')
</script>
