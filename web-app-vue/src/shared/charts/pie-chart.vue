<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height"
         :viewBox="`-${raio} -${raio} ${2 * raio} ${2 * raio}`">
      <path v-for="(arc, i) in arcs" :key="'arcs'+i"
            :fill="arc.color" :transform="`rotate(${arc.ar})`"
            :d="`
          M 0 0
          L ${arc.p1[0]} ${arc.p1[1]}
          A ${raio} ${raio} 0 0 1 ${arc.p2[0]} ${arc.p2[1]}
          A ${raio} ${raio} 0 0 1 ${arc.p3[0]} ${arc.p3[1]}
          L 0 0
        `" />
    </svg>
    <div v-for="(e, i) in data" :key="'label-' + i">
      <i v-if="legenda" :style="{ color: e.color }">{{ e.label }} - {{ e.value }}</i>
    </div>
    <br />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const raio = 1

const props = defineProps(['title', 'height', 'data'])

const arcs = computed(() => {
  if (!props.data?.length) return []
  const total = props.data?.map(a => a.value).reduce((a, b) => a + b, 0) || 1
  let accAngle = 0
  const elements = props.data?.map((e) => {
    const a1 = 360 * (e.value / total)
    const p1 = [Math.cos(0) * raio, Math.sin(0) * raio]
    const p2 = [Math.cos((a1 / 2 * Math.PI) / 180) * raio, Math.sin((a1 / 2 * Math.PI) / 180) * raio]
    const p3 = [Math.cos((a1 * Math.PI) / 180) * raio, Math.sin((a1 * Math.PI) / 180) * raio]
    const result = { ...e, ar: accAngle, p1, p2, p3 }
    accAngle += a1
    return result
  })
  return elements
})

const legenda = ref(true)
</script>
