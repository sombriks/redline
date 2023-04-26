<template>
  <div class="card">{{ props.title }}</div>
</template>

<script setup>
const props = defineProps(["title", "active"]);
</script>

<style scoped>
.card {
    border: 1px solid red;
    min-width: 100%;
    margin: 1em;
    padding: 1em;
    border-radius: 1em;
}

.expand {

}
</style>