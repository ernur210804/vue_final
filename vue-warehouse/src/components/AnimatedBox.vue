<template>
  <div :class="{ active: isActive }" @click="isActive = !isActive"></div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(false)
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;
  transition: transform 0.5s;
}
.active {
  transform: rotate(45deg);
}
</style>
