<template>
  <div>
    <h2>Admin Panel</h2>
    <ProductForm @add="addProduct" />
  </div>
</template>

<script setup>
import { useWarehouseStore } from '../store/warehouseStore'
import ProductForm from '../components/ProductForm.vue'

const store = useWarehouseStore()

const addProduct = (product) => {
  store.addProduct({
    id: Date.now(),
    price: 0,
    ...product
  })
}
</script>
