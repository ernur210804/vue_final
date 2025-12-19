<script setup>
import { ref, onMounted } from 'vue';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore';
import { useProductStore } from '../stores/product/productStore';
import { Package, Warehouse, TrendingUp, AlertCircle } from 'lucide-vue-next';

const warehouseStore = useWarehouseStore();
const productStore = useProductStore();

const stats = ref({
  totalWarehouses: 0,
  totalProducts: 0,
  lowStockItems: 0,
  recentMovements: 0
});

onMounted(async () => {
  await warehouseStore.fetchWarehouses();
  await productStore.fetchProducts();
  
  stats.value.totalWarehouses = warehouseStore.warehouses.length;
  stats.value.totalProducts = productStore.products.length;
  stats.value.lowStockItems = 3; // Mock data
  stats.value.recentMovements = 15; // Mock data
});
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Главная</h1>
    
    <div :class="$style.statsGrid">
      <div :class="$style.statCard">
        <div :class="$style.statIcon">
          <Warehouse :size="32" />
        </div>
        <div :class="$style.statContent">
          <div :class="$style.statValue">{{ stats.totalWarehouses }}</div>
          <div :class="$style.statLabel">Всего складов</div>
        </div>
      </div>
      
      <div :class="$style.statCard">
        <div :class="$style.statIcon">
          <Package :size="32" />
        </div>
        <div :class="$style.statContent">
          <div :class="$style.statValue">{{ stats.totalProducts }}</div>
          <div :class="$style.statLabel">Товаров</div>
        </div>
      </div>
      
      <div :class="$style.statCard">
        <div :class="$style.statIcon">
          <AlertCircle :size="32" color="#F44336" />
        </div>
        <div :class="$style.statContent">
          <div :class="$style.statValue">{{ stats.lowStockItems }}</div>
          <div :class="$style.statLabel">Низкий остаток</div>
        </div>
      </div>
      
      <div :class="$style.statCard">
        <div :class="$style.statIcon">
          <TrendingUp :size="32" />
        </div>
        <div :class="$style.statContent">
          <div :class="$style.statValue">{{ stats.recentMovements }}</div>
          <div :class="$style.statLabel">Движений за день</div>
        </div>
      </div>
    </div>

    <div :class="$style.quickActions">
      <h2 :class="$style.sectionTitle">Быстрые действия</h2>
      <div :class="$style.actionButtons">
        <router-link to="/warehouses" :class="$style.actionButton">
          Управление складами
        </router-link>
        <router-link to="/products" :class="$style.actionButton">
          Управление товарами
        </router-link>
        <router-link to="/raw-orders" :class="$style.actionButton">
          Создать заказ
        </router-link>
        <router-link to="/reports" :class="$style.actionButton">
          Просмотр отчетов
        </router-link>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  padding: var(--spacing-xxl);
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-xxl);
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.statCard {
  background: var(--color-bg-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.statIcon {
  color: var(--color-primary);
}

.statContent {
  flex: 1;
}

.statValue {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-dark);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.statLabel {
  font-size: var(--font-size-base);
  color: var(--color-text-medium);
}

.quickActions {
  background: var(--color-bg-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.sectionTitle {
  font-size: var(--font-size-large);
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-lg);
}

.actionButtons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.actionButton {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  text-align: center;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background 0.2s;
  font-weight: 500;
}

.actionButton:hover {
  background: var(--color-active-blue);
}
</style>