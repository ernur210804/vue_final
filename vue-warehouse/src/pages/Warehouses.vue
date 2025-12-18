<script setup>
import { onMounted, ref } from 'vue';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore.js';
import WarehouseCard from '../components/warehouse/WarehouseCard.vue';
import Loader from '../components/ui/Loader.vue';
import useFetch from '../composables/useFetch.js';

const store = useWarehouseStore();
const { loading, error } = useFetch(() => store.fetchWarehouses());
</script>

<template>
  <div class="warehouses">
    <Loader v-if="loading" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="warehouse in store.getWarehouses" :key="warehouse.id" class="card-wrapper">
        <WarehouseCard :warehouse="warehouse" @select="() => $router.push(`/warehouses/${warehouse.id}`)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.warehouses { display: flex; flex-wrap: wrap; }
.card-wrapper { margin: 10px; }
@media (max-width: 768px) { .warehouses { flex-direction: column; } }
</style>