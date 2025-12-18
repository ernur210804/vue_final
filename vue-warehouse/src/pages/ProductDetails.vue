<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product/productStore.js';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore.js';
import Loader from '../components/ui/Loader.vue';

const route = useRoute();
const productStore = useProductStore();
const warehouseStore = useWarehouseStore();

const productId = ref(route.params.id);
const productBalances = ref([]);

onMounted(async () => {
  await productStore.fetchProductById(productId.value);
  await warehouseStore.fetchWarehouses();
  // Fetch balances for all warehouses and filter by product
  productBalances.value = [];
  for (const wh of warehouseStore.getWarehouses) {
    await warehouseStore.fetchBalances(wh.id);
    const balance = warehouseStore.getBalances.find(b => b.product_id === parseInt(productId.value));
    if (balance) {
      productBalances.value.push({ ...balance, warehouse_name: wh.name });
    }
  }
});
</script>

<template>
  <div>
    <Loader v-if="productStore.loading" />
    <div v-else-if="productStore.error">{{ productStore.error }}</div>
    <div v-else>
      <h1>{{ productStore.getSelected?.name }} ({{ productStore.getSelected?.unit }})</h1>
      <h2>Остатки по складам</h2>
      <table>
        <thead>
          <tr>
            <th>Склад</th>
            <th>Остаток на конец</th>
            <th>Приход</th>
            <th>Расход</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="balance in productBalances" :key="balance.warehouse_name">
            <td>{{ balance.warehouse_name }}</td>
            <td>{{ balance.ending_balance }}</td>
            <td>{{ balance.incoming_qty }}</td>
            <td>{{ balance.outgoing_qty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
div { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 8px; }
@media (max-width: 768px) { div { padding: 10px; } }
</style>