<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg v-if="groups?.length" width="100%" :height="height">
      <template v-for="(e, i) in groups" :key="'rect-' + i">
        <rect
          v-for="(j, k) in e.data"
          :key="`rect-${i}-${k}`"
          :x="`${starts[i][k]}%`"
          :y="`${i * (100 / groups.length)}%`"
          :width="`${sizes[i][k]}%`"
          :height="100 / groups.length"
          :stroke="e.color"
          :fill="j.color"
          stroke-width="2px"
          fill-opacity="60%"
          ry="25px"
          rx="3px"
        />
      </template>
    </svg>
    <p v-if="!groups?.length">Sem dados para exibir</p>
    <div v-for="(e, i) in groups" :key="'label-' + i">
      <fieldset v-if="legenda" :style="{ color: e.color }">
        <legend>{{ e.label }}</legend>
        <div v-for="(j, k) in e.data" :key="`label-${i}-${k}`">
          <i :style="{ color: j.color }">{{ j.label }}: {{ j.value }}</i>
        </div>
      </fieldset>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['title', 'height', 'groups'])
const sizes = computed(() =>
  props.groups?.map((e) => {
    const values = e.data.map((e) => e.value)
    const sum = values.reduce((acc, e) => acc + e, 0)
    return values.map((e) => (100 * e) / sum)
  })
)
const starts = computed(() =>
  props.groups?.map((e, j) => {
    const values = e.data.map((e, k) => {
      return sizes.value[j].slice(0, k).reduce((acc, e) => acc + e, 0)
    })
    return values
  })
)
const legenda = ref(true)
</script>
<style scoped></style>
