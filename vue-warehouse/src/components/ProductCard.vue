<template>
  <div class="card" @click="$emit('select', product.id)">
    <h3>{{ product.title }}</h3>
    <p>\${{ product.price }}</p>
  </div>
</template>

<script setup>
defineProps({ product: Object })
defineEmits(['select'])
</script>

<style scoped>
.card { border: 1px solid #ccc; padding: 10px; cursor: pointer }
</style>
