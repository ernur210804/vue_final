<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product/productStore.js';
import Loader from '../components/ui/Loader.vue';

const route = useRoute();
const store = useProductStore();

onMounted(() => {
  store.fetchProductById(route.params.id);
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