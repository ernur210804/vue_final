<script setup>
import { onMounted } from 'vue';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore.js';
import Loader from '../components/ui/Loader.vue';

const store = useWarehouseStore();
const selectedWarehouseId = ref(null);

onMounted(() => {
  store.fetchWarehouses();
});

const fetchReport = () => {
  if (selectedWarehouseId.value) {
    store.fetchHistory(selectedWarehouseId.value);
  }
};
</script>

<template>
  <div>
    <h1>Отчеты</h1>
    <select v-model="selectedWarehouseId" @change="fetchReport">
      <option value="">Выберите склад</option>
      <option v-for="wh in store.getWarehouses" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
    </select>
    <Loader v-if="store.loading" />
    <div v-else-if="store.error">{{ store.error }}</div>
    <ul v-else>
      <li v-for="movement in store.getHistory" :key="movement.id">
        {{ movement.type }}: {{ movement.quantity }} ({{ movement.status }}) at {{ movement.date }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
div { padding: 20px; }
select { margin-bottom: 20px; }
@media (max-width: 768px) { div { padding: 10px; } }
</style>