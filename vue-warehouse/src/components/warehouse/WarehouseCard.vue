<script setup>
defineProps({
  warehouse: { type: Object, required: true }
});
defineEmits(['select']);
</script>

<template>
  <div class="card" @click="$emit('select')">
    <h3>{{ warehouse.name }}</h3>
    <p>{{ warehouse.location }}</p>
  </div>
</template>

<style scoped>
.card { border: 1px solid #ccc; padding: 20px; border-radius: 8px; cursor: pointer; transition: transform 0.3s; }
.card:hover { transform: scale(1.05); }
@media (max-width: 768px) { .card { padding: 10px; } }
</style>