<template>
  <div style="width: 100%">
    <h3>{{ props.title }}</h3>
    <svg width="100%" :height="props.height" viewBox="0 0 20 20">
      <!-- TODO need more math -->
      <circle
        v-for="(e, i) in teste"
        :key="i"
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        :stroke="color[i]"
        stroke-width="10"
        :stroke-dasharray="`calc(${reduz(i, teste)} * 31.4 / 100) 31.4`"
        transform="rotate(-90) translate(-20)"
      />
      <!--      <circle r="5" cx="10" cy="10" fill="transparent"-->
      <!--              stroke="tomato"-->
      <!--              stroke-width="10"-->
      <!--              stroke-dasharray="calc(66 * 31.4 / 100) 31.4"-->
      <!--              transform="rotate(-90) translate(-20)" />-->
      <!--      <circle r="5" cx="10" cy="10" fill="transparent"-->
      <!--              stroke="lightgreen"-->
      <!--              stroke-width="10"-->
      <!--              stroke-dasharray="calc(33 * 31.4 / 100) 31.4"-->
      <!--              transform="rotate(-90) translate(-20)" />-->
    </svg>
    <!--    <i>Despesa 1</i><br/>-->
    <!--    <i>Despesa 2</i><br/>-->
    <!--    <i>Despesa 3</i><br/>-->
    <div v-for="(e, i) in teste" :key="i">
      <i :style="{ color: color[i] }">{{ e }}</i>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['title', 'height'])

const teste = [25, 25, 10, 5, 5, 30]
const color = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan']

const reduz = (i, arr) => {
  arr = [...arr]
  while (i-- > 0) arr.shift()
  return arr.reduce((acc, e) => acc + e, 0)
}
</script>
