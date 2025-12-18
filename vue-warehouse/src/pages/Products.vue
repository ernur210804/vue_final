<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/product/productStore.js';
import Loader from '../components/ui/Loader.vue';

const store = useProductStore();

onMounted(() => {
  store.fetchProducts();
});
</script>

<template>
  <div class="products">
    <Loader v-if="store.loading" />
    <div v-else-if="store.error">{{ store.error }}</div>
    <ul v-else>
      <li v-for="product in store.getProducts" :key="product.id" @click="$router.push(`/products/${product.id}`)">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.products { padding: 20px; }
ul { list-style: none; }
li { cursor: pointer; margin: 10px 0; }
@media (max-width: 768px) { .products { padding: 10px; } }
</style>