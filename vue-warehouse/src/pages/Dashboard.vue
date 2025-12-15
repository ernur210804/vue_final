<template>
  <div>
    <h2>Dashboard</h2>
    <p>Total products: {{ store.totalProducts }}</p>
  </div>
</template>

<script setup>
import { useWarehouseStore } from '../store/warehouseStore'
const store = useWarehouseStore()
</script>
