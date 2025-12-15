<template>
  <div>
    <h2>Products</h2>

    <p v-if="store.loading">Loading...</p>
    <p v-if="store.error">{{ store.error }}</p>

    <ProductCard
      v-for="product in store.products"
      :key="product.id"
      :product="product"
      @select="goToDetails"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWarehouseStore } from '../store/warehouseStore'
import ProductCard from '../components/ProductCard.vue'

const store = useWarehouseStore()
const router = useRouter()

onMounted(() => {
  store.fetchProducts()
})

const goToDetails = (id) => {
  router.push(`/products/${id}`)
}
</script>
