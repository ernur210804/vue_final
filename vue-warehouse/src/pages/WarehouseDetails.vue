<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore.js';
import Loader from '../components/ui/Loader.vue';

const route = useRoute();
const store = useWarehouseStore();

onMounted(() => {
  store.fetchWarehouseById(route.params.id);
});
</script>

<template>
  <div>
    <Loader v-if="store.loading" />
    <div v-else-if="store.error">{{ store.error }}</div>
    <div v-else>
      <h1>{{ store.getSelected?.name }}</h1>
      <p>{{ store.getSelected?.details }}</p>
    </div>
  </div>
</template>

<style scoped>
div { padding: 20px; }
@media (max-width: 768px) { div { padding: 10px; } }
</style>