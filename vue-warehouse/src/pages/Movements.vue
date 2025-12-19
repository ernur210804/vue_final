<script setup>
import { ref } from 'vue'
import { useMovementStore } from '../stores/movement/movementStore'

const store = useMovementStore()

const form = ref({
  product_id: 1,
  warehouse_id: 1,
  quantity: 10,
  price: 100,
  date: new Date().toISOString(),
  status: 'draft'
})

const incoming = async () => {
  await store.incoming(form.value)
}

const outgoing = async () => {
  await store.outgoing(form.value)
}
</script>

<template>
  <h1>Movements</h1>

  <button @click="incoming">Incoming</button>
  <button @click="outgoing">Outgoing</button>
</template>
