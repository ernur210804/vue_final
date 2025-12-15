<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="Name" />
    <span v-if="error">{{ error }}</span>

    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])

const title = ref('')
const error = ref('')

function submit() {
  if (title.value.length < 3) {
    error.value = 'Too short'
    return
  }
  emit('add', { title: title.value })
  title.value = ''
}
</script>
