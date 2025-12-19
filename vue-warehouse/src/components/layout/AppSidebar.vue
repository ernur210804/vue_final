<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Home, Workflow, RefreshCw, FileCheck, Users, 
  Handshake, Factory, TrendingUp, ShoppingCart, 
  Warehouse, Clock, FileBarChart, Settings, 
  Book, ChevronDown, ChevronRight 
} from 'lucide-vue-next';

const router = useRouter();
const activeRoute = ref('warehouses');

const menuItems = [
  { id: 'home', label: 'Главная', icon: Home, route: '/home' },
  { id: 'bpm', label: 'BPM', icon: Workflow, hasSubmenu: true },
  { id: 'autoorders', label: 'Автозаказы', icon: RefreshCw, hasSubmenu: true },
  { id: 'contracts', label: 'Реестр договоров', icon: FileCheck },
  { id: 'departments', label: 'Отделы', icon: Users, route: '/departments' },
  { id: 'crm', label: 'CRM', icon: Handshake, hasSubmenu: true },
  { id: 'production', label: 'Производство', icon: Factory, hasSubmenu: true },
  { id: 'forecast', label: 'Прогноз продаж', icon: TrendingUp },
  { id: 'raw-orders', label: 'Заказы сырья', icon: ShoppingCart, route: '/raw-orders' },
  { id: 'warehouses', label: 'Склады', icon: Warehouse, route: '/warehouses' },
  { id: 'timetracking', label: 'Табелирование', icon: Clock, route: '/timetracking' },
  { id: 'reports', label: 'Отчёты', icon: FileBarChart, route: '/reports' },
  { id: 'admin', label: 'Администрирование', icon: Settings, hasSubmenu: true },
  { id: 'reference', label: 'Справочник', icon: Book, hasSubmenu: true },
  { id: 'settings', label: 'Настройки', icon: Settings, route: '/settings' },
];

const expandedItems = ref([]);

const toggleExpand = (itemId) => {
  const index = expandedItems.value.indexOf(itemId);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(itemId);
  }
};

const navigate = (item) => {
  if (item.hasSubmenu) {
    toggleExpand(item.id);
  } else if (item.route) {
    activeRoute.value = item.id;
    router.push(item.route);
  }
};

// Update active route based on current path
const updateActiveRoute = () => {
  const currentPath = router.currentRoute.value.path;
  const matchedItem = menuItems.find(item => item.route === currentPath);
  if (matchedItem) {
    activeRoute.value = matchedItem.id;
  }
};

// Watch for route changes
router.afterEach(() => {
  updateActiveRoute();
});

updateActiveRoute();
</script>

<template>
  <aside :class="$style.sidebar">
    <div :class="$style.logo">
      <span :class="$style.logoText">alashi</span>
    </div>
    <nav :class="$style.nav">
      <ul :class="$style.menuList">
        <li 
          v-for="item in menuItems" 
          :key="item.id"
          :class="[$style.menuItem, { [$style.active]: activeRoute === item.id }]"
        >
          <div :class="$style.menuItemContent" @click="navigate(item)">
            <component :is="item.icon" :class="$style.icon" :size="18" />
            <span :class="$style.label">{{ item.label }}</span>
            <ChevronDown 
              v-if="item.hasSubmenu" 
              :class="[$style.chevron, { [$style.expanded]: expandedItems.includes(item.id) }]"
              :size="16"
            />
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style module>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

.logo {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.logoText {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-dark);
}

.nav {
  flex: 1;
  padding: var(--spacing-sm) 0;
}

.menuList {
  list-style: none;
}

.menuItem {
  margin: 2px 0;
}

.menuItemContent {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  transition: background-color 0.2s;
  gap: var(--spacing-md);
}

.menuItemContent:hover {
  background-color: var(--color-hover-bg);
}

.menuItem.active .menuItemContent {
  background-color: var(--color-hover-bg);
  border-left: 3px solid var(--color-primary);
  padding-left: calc(var(--spacing-lg) - 3px);
}

.icon {
  color: var(--color-text-medium);
  flex-shrink: 0;
}

.menuItem.active .icon {
  color: var(--color-primary);
}

.label {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--color-text-dark);
}

.chevron {
  color: var(--color-text-light);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron.expanded {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
}
</style>