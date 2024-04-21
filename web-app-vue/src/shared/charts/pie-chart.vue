<template>
  <div style="width: 100%" @click="legenda = !legenda">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height" :viewBox="`-${raio} -${raio} ${2 * raio} ${2 * raio}`">
      <path
        :d="`
          M 0 0
          L ${p1[0]} ${p1[1]}
          A ${raio} ${raio} 0 0 1 ${p2[0]} ${p2[1]}
          A ${raio} ${raio} 0 0 1 ${p3[0]} ${p3[1]}
          L 0 0
        `"
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
import { ref } from 'vue'

const raio = 1

const a0 = 10
const a1 = 360

const p1 = [Math.cos((a0 * Math.PI) / 180) * raio, Math.sin((a0 * Math.PI) / 180) * raio]
const p2 = [Math.cos((a1/2 * Math.PI) / 180) * raio, Math.sin((a1/2 * Math.PI) / 180) * raio]
const p3 = [Math.cos((a1 * Math.PI) / 180) * raio, Math.sin((a1 * Math.PI) / 180) * raio]

const props = defineProps(['title', 'height', 'data'])

const legenda = ref(true)
</script>
