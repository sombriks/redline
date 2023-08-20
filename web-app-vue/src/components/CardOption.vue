<template>
  <div class="card" ref="card"
       :class="{'expand':props.active, 'shrink': !props.active}">
    <div class="title" @click="onActive">{{props.title}}</div>
    <div v-if="props.active">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["title", "active"]);
const emit = defineEmits(["onActive"]);

const card = ref(null);

const onActive = () => {
  emit("onActive", !props.active);
  setTimeout(() => {
    card.value?.scrollIntoView(false);
  }, 300);
};

</script>

<style scoped>
.card {
    border: 1px solid red;
    min-width: 100%;
    padding: 1em;
}

.title {
  display:flex;
  justify-content: center;
}

.expand {
    animation: expandAnim forwards 500ms;
}

@keyframes expandAnim {
    0% {
        min-height: auto;
    }

    1% {
        min-height: 10vh;
    }

    100% {
        min-height: 60vh;
    }
}

.shrink {
    animation: shrinkAnim forwards 500ms;
}

@keyframes shrinkAnim {
    0% {
        min-height: 60vh;
    }

    1% {
        min-height: 55vh;
    }

    90% {
        min-height: 5vh;
    }

    100% {
        min-height: auto;
    }
}
</style>
