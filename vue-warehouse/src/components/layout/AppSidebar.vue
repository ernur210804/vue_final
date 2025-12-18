<script setup>
defineProps({
  items: { type: Array, default: () => [] }
});
defineEmits(['select']);
</script>

<template>
  <aside>
    <ul>
      <li v-for="item in items" :key="item.id" @click="$emit('select', item)">
        {{ item.name }}
      </li>
    </ul>
  </aside>
</template>

<style scoped>
aside { background: #f0f0f0; padding: 20px; width: 200px; }
li { cursor: pointer; margin: 10px 0; }
@media (max-width: 768px) { aside { width: 100%; } }
</style>