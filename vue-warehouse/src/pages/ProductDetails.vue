<template>
  <div v-if="product">
    <h2>{{ product.title }}</h2>
    <p>Price: {{ product.price }}</p>
  </div>

  <p v-else>Product not found</p>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWarehouseStore } from '../store/warehouseStore'

const route = useRoute()
const store = useWarehouseStore()

const product = computed(() =>
  store.products.find(p => p.id == route.params.id)
)
</script>
