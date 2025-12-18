<script setup>
defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
});
defineEmits(['click']);
</script>

<template>
  <button :type="type" :disabled="disabled" @click="$emit('click')">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; transition: background 0.3s; }
button:hover { background: #0056b3; }
button:disabled { background: #ccc; }
@media (max-width: 768px) { button { padding: 8px 16px; } }
</style>