<template>
<div class="page">
<h1>Склады</h1>


<WarehouseFilters
v-model:from="from"
v-model:to="to"
v-model:warehouse="warehouse"
@add-in="openIn"
@add-out="openOut"
/>


<WarehouseTable :rows="store.rows" />


<StockModal
v-if="modal"
:type="modal"
@close="modal=null"
@saved="reload"
/>
</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useWarehouseStore } from '../store/warehouseStore'
import WarehouseFilters from '../components/WarehouseFilters.vue'
import WarehouseTable from '../components/WarehouseTable.vue'
import StockModal from '../components/StockModal.vue'


const store = useWarehouseStore()


const from = ref('2025-12-01')
const to = ref('2025-12-31')
const warehouse = ref(1)
const modal = ref(null)


const reload = () => store.load(from.value, to.value, warehouse.value)


const openIn = () => modal.value = 'IN'
const openOut = () => modal.value = 'OUT'


onMounted(reload)
</script>


<style scoped>
.page {
padding: 24px;
background: #f5f7fa;
min-height: 100vh;
}
h1 { margin-bottom: 16px; }
</style>