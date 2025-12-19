<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMovementStore } from '../stores/movement/movementStore'
import { useProductStore } from '../stores/product/productStore'

const route = useRoute()
const warehouseId = Number(route.params.id)

const movementStore = useMovementStore()
const productStore = useProductStore()

const form = ref({
  product_id: null,
  quantity: 0,
  price: 0
})

onMounted(async () => {
  await productStore.fetchProducts()
  await movementStore.fetchBalances(warehouseId)
  await movementStore.fetchHistory(warehouseId)
})

async function incoming() {
  await movementStore.createIncoming({
    ...form.value,
    warehouse_id: warehouseId,
    status: 'draft',
    date: new Date().toISOString()
  })
  await movementStore.fetchHistory(warehouseId)
}

async function outgoing() {
  await movementStore.createOutgoing({
    ...form.value,
    warehouse_id: warehouseId,
    status: 'draft',
    date: new Date().toISOString()
  })
  await movementStore.fetchHistory(warehouseId)
}

async function post(id) {
  await movementStore.postMovement(id)
  await movementStore.fetchBalances(warehouseId)
  await movementStore.fetchHistory(warehouseId)
}
</script>

<template>
  <h2>Warehouse #{{ warehouseId }}</h2>

  <!-- BALANCES -->
  <h3>Balances</h3>
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
    </tr>
    <tr v-for="b in movementStore.balances" :key="b.product_id">
      <td>{{ b.product_name }}</td>
      <td>{{ b.quantity }}</td>
    </tr>
  </table>

  <!-- FORM -->
  <h3>New Movement</h3>
  <select v-model="form.product_id">
    <option disabled value="">Select product</option>
    <option v-for="p in productStore.products" :key="p.id" :value="p.id">
      {{ p.name }}
    </option>
  </select>

  <input type="number" v-model="form.quantity" placeholder="Quantity" />
  <input type="number" v-model="form.price" placeholder="Price" />

  <button @click="incoming">Incoming</button>
  <button @click="outgoing">Outgoing</button>

  <!-- HISTORY -->
  <h3>History</h3>
  <table>
    <tr>
      <th>ID</th>
      <th>Type</th>
      <th>Product</th>
      <th>Qty</th>
      <th>Status</th>
      <th></th>
    </tr>

    <tr v-for="m in movementStore.history" :key="m.id">
      <td>{{ m.id }}</td>
      <td>{{ m.type }}</td>
      <td>{{ m.product_id }}</td>
      <td>{{ m.quantity }}</td>
      <td>{{ m.status }}</td>
      <td>
        <button v-if="m.status === 'draft'" @click="post(m.id)">
          Post
        </button>
      </td>
    </tr>
  </table>
</template>
