<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore.js';
import { useProductStore } from '../stores/product/productStore.js';
import Loader from '../components/ui/Loader.vue';
import IncomingForm from '../components/warehouse/IncomingForm.vue';
import OutgoingForm from '../components/warehouse/OutgoingForm.vue';

const route = useRoute();
const warehouseStore = useWarehouseStore();
const productStore = useProductStore();

const warehouseId = ref(route.params.id);

// Fetch data
onMounted(async () => {
  await warehouseStore.fetchWarehouseById(warehouseId.value);
  await warehouseStore.fetchBalances(warehouseId.value);
  await warehouseStore.fetchHistory(warehouseId.value);
  await productStore.fetchProducts();
});

// Refetch balances and history after operations
const refetchData = () => {
  warehouseStore.fetchBalances(warehouseId.value);
  warehouseStore.fetchHistory(warehouseId.value);
};

// Watch for route change if id changes
watch(() => route.params.id, (newId) => {
  warehouseId.value = newId;
  refetchData();
});
</script>

<template>
  <div>
    <Loader v-if="warehouseStore.loading" />
    <div v-else-if="warehouseStore.error">{{ warehouseStore.error }}</div>
    <div v-else>
      <h1>{{ warehouseStore.getSelected?.name }}</h1>
      
      <!-- Balance Table -->
      <h2>Остатки и движение товаров</h2>
      <table>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Наименование склада</th>
            <th>Единица измерения</th>
            <th>Остаток на начало</th>
            <th>Приход (количество)</th>
            <th>Расход (количество)</th>
            <th>Остаток на конец</th>
            <th>Дата изменения</th>
            <th>Сумма прихода</th>
            <th>Сумма расхода</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="balance in warehouseStore.getBalances" :key="balance.product_id">
            <td>{{ balance.product_name }}</td>
            <td>{{ warehouseStore.getSelected?.name }}</td>
            <td>{{ balance.unit }}</td>
            <td>{{ balance.beginning_balance }}</td>
            <td>{{ balance.incoming_qty }}</td>
            <td>{{ balance.outgoing_qty }}</td>
            <td>{{ balance.ending_balance }}</td>
            <td>{{ balance.last_change_date }}</td>
            <td>{{ balance.incoming_amount }}</td>
            <td>{{ balance.outgoing_amount }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Forms -->
      <h2>Приход товаров</h2>
      <IncomingForm :warehouseId="warehouseId" @success="refetchData" />
      
      <h2>Расход товаров</h2>
      <OutgoingForm :warehouseId="warehouseId" @success="refetchData" />
      
      <!-- History -->
      <h2>История движений</h2>
      <ul>
        <li v-for="movement in warehouseStore.getHistory" :key="movement.id">
          {{ movement.type }}: {{ movement.quantity }} ({{ movement.status }}) at {{ movement.date }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
div { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
@media (max-width: 768px) { div { padding: 10px; } table { font-size: 12px; } }
</style>