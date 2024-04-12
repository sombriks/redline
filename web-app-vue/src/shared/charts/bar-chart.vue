<template>
  <div>
    <h3>{{ title }}</h3>
    <svg width="100%" :height="height">
      <rect x="0" y="0" :width="`${width1}%`" height="50%" :fill="color1" stroke-width="0" />
      <rect x="0" y="50%" :width="`${width2}%`" height="50%" :fill="color2" stroke-width="0" />
    </svg>
    <i :style="{color:color1}">{{label1}}: {{value1}}</i>&nbsp;&nbsp;|
    <i :style="{color:color2}">{{label2}}: {{value2}}</i>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['title', 'label1', 'value1', 'label2', 'value2', 'color1', 'color2', 'height'])

const biggest = computed(() => Math.max(props.value1, props.value2))
const width1 = computed(() => (props.value1 / biggest.value) * 100)
const width2 = computed(() => (props.value2 / biggest.value) * 100)

const test = () => console.log('aaa')
</script>
<style scoped>
/* TODO grab this from vuetify */
text {
  color: var(--color-text);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-rendering: optimizeLegibility;
  line-height: 1.6;
  font-size: 15px;
}
</style>
