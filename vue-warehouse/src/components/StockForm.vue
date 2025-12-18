<template>
  <form @submit.prevent="submit">
    <select v-model="type">
      <option value="in">Приход</option>
      <option value="out">Расход</option>
    </select>

    <input v-model.number="qty" type="number" required />
    <button>Сохранить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useWarehouseStore } from '../store/warehouseStore'

const store = useWarehouseStore()
const qty = ref(0)
const type = ref('in')

function submit() {
  store.addMovement({ quantity: qty.value, type: type.value })
}
</script>
