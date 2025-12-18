<script setup>
import { onMounted } from 'vue';
import { useWarehouseStore } from '../stores/warehouseStore';

const warehouseStore = useWarehouseStore();

onMounted(() => {
  warehouseStore.fetchWarehouses(); // Triggers the real API call
});
</script>

<template>
  <div>
    <h1>Warehouses</h1>
    <div v-if="warehouseStore.loading">Fetching from backend...</div>
    
    <ul v-else>
      <li v-for="wh in warehouseStore.warehouses" :key="wh.id">
        Warehouse {{ wh.id }} - {{ wh.name }}
      </li>
    </ul>
  </div>
</template>