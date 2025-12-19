<script setup>
import { onMounted, ref } from 'vue';
import { useWarehouseStore } from '../stores/warehouse/warehouseStore';
import WarehouseTable from '../components/WarehouseTable.vue';
import { Calendar, Search, Plus } from 'lucide-vue-next';

const store = useWarehouseStore();
const activeTab = ref('raw');
const startDate = ref('2025-12-01');
const endDate = ref('2025-12-31');
const searchQuery = ref('');

// Mock data for demonstration
const inventoryData = ref([
  { id: 1, name: 'Битум', unit: 'кг', start_balance: 0, income: 0, outcome: 0, end_balance: 0, last_update: '2025-12-19' },
  { id: 2, name: 'Бумага', unit: 'кг', start_balance: 120, income: 0, outcome: 0, end_balance: 120, last_update: '2025-12-19' },
  { id: 3, name: 'Грифель', unit: 'г', start_balance: -5629, income: 0, outcome: 0, end_balance: -5629, last_update: '2025-12-19' },
  { id: 4, name: 'Дерево', unit: 'шт', start_balance: -160, income: 0, outcome: 0, end_balance: -160, last_update: '2025-12-19' },
  { id: 5, name: 'ПВХ', unit: 'шт', start_balance: 0, income: 0, outcome: 0, end_balance: 0, last_update: '2025-12-19' },
  { id: 6, name: 'Плита', unit: 'шт', start_balance: 35, income: 0, outcome: 0, end_balance: 35, last_update: '2025-12-19' },
  { id: 7, name: 'Резина', unit: 'м', start_balance: 312, income: 0, outcome: 0, end_balance: 312, last_update: '2025-12-19' },
  { id: 8, name: 'товар 10', unit: 'шт', start_balance: 163, income: 0, outcome: 0, end_balance: 163, last_update: '2025-12-19' },
  { id: 9, name: 'Уголь', unit: 'кг', start_balance: 123, income: 0, outcome: 0, end_balance: 123, last_update: '2025-12-19' },
  { id: 10, name: 'Уголь', unit: 'кг', start_balance: 180, income: 0, outcome: 0, end_balance: 180, last_update: '2025-12-19' },
]);

const filteredData = ref([...inventoryData.value]);
const showAddModal = ref(false);
const editingItem = ref(null);
const formData = ref({
  name: '',
  unit: 'кг',
  start_balance: 0,
  income: 0,
  outcome: 0
});

onMounted(() => {
  store.fetchWarehouses();
});

const filterData = () => {
  if (!searchQuery.value) {
    filteredData.value = [...inventoryData.value];
  } else {
    filteredData.value = inventoryData.value.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

const addItem = () => {
  const item = {
    id: Date.now(),
    name: formData.value.name,
    unit: formData.value.unit,
    start_balance: Number(formData.value.start_balance),
    income: Number(formData.value.income),
    outcome: Number(formData.value.outcome),
    end_balance: Number(formData.value.start_balance) + Number(formData.value.income) - Number(formData.value.outcome),
    last_update: new Date().toISOString().split('T')[0]
  };
  
  inventoryData.value.push(item);
  filterData();
  closeModal();
};

const updateItem = () => {
  const index = inventoryData.value.findIndex(item => item.id === editingItem.value.id);
  if (index !== -1) {
    inventoryData.value[index] = {
      ...formData.value,
      id: editingItem.value.id,
      end_balance: Number(formData.value.start_balance) + Number(formData.value.income) - Number(formData.value.outcome),
      last_update: new Date().toISOString().split('T')[0]
    };
    filterData();
    closeModal();
  }
};

const deleteItem = (id) => {
  if (confirm('Удалить этот товар?')) {
    inventoryData.value = inventoryData.value.filter(item => item.id !== id);
    filterData();
  }
};

const openAddModal = () => {
  editingItem.value = null;
  formData.value = { name: '', unit: 'кг', start_balance: 0, income: 0, outcome: 0 };
  showAddModal.value = true;
};

const openEditModal = (item) => {
  editingItem.value = item;
  formData.value = { ...item };
  showAddModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  editingItem.value = null;
  formData.value = { name: '', unit: 'кг', start_balance: 0, income: 0, outcome: 0 };
};

const saveItem = () => {
  if (editingItem.value) {
    updateItem();
  } else {
    addItem();
  }
};
</script>

<template>
  <div :class="$style.pageContainer">
    <div :class="$style.header">
      <h1 :class="$style.title">Склады</h1>
    </div>

    <div :class="$style.tabs">
      <button 
        :class="[$style.tab, { [$style.activeTab]: activeTab === 'raw' }]"
        @click="activeTab = 'raw'"
      >
        Склад сырья
      </button>
      <button 
        :class="[$style.tab, { [$style.activeTab]: activeTab === 'finished' }]"
        @click="activeTab = 'finished'"
      >
        Склад ГП
      </button>
    </div>

    <div :class="$style.filters">
      <div :class="$style.dateRange">
        <div :class="$style.dateInput">
          <input 
            type="date" 
            v-model="startDate"
            :class="$style.input"
          />
          <Calendar :class="$style.calendarIcon" :size="16" />
        </div>
        <span :class="$style.dateSeparator">→</span>
        <div :class="$style.dateInput">
          <input 
            type="date" 
            v-model="endDate"
            :class="$style.input"
          />
          <Calendar :class="$style.calendarIcon" :size="16" />
        </div>
        <button :class="$style.clearButton">✕</button>
      </div>

      <div :class="$style.searchBox">
        <Search :class="$style.searchIcon" :size="16" />
        <input 
          type="text" 
          v-model="searchQuery"
          @input="filterData"
          placeholder="Поиск по наименованию"
          :class="$style.searchInput"
        />
      </div>
    </div>

    <div :class="$style.content">
      <div :class="$style.tableHeader">
        <button :class="$style.addButton" @click="openAddModal">
          <Plus :size="16" />
          Добавить товар
        </button>
      </div>
      <WarehouseTable 
        :rows="filteredData" 
        @edit="openEditModal"
        @delete="deleteItem"
      />
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" :class="$style.modalOverlay" @click="closeModal">
      <div :class="$style.modal" @click.stop>
        <h2 :class="$style.modalTitle">
          {{ editingItem ? 'Редактировать товар' : 'Добавить товар' }}
        </h2>
        
        <form @submit.prevent="saveItem" :class="$style.form">
          <div :class="$style.formGroup">
            <label :class="$style.label">Наименование</label>
            <input 
              v-model="formData.name"
              :class="$style.formInput"
              required
            />
          </div>

          <div :class="$style.formGroup">
            <label :class="$style.label">Единица измерения</label>
            <select 
              v-model="formData.unit"
              :class="$style.formInput"
            >
              <option value="кг">кг</option>
              <option value="г">г</option>
              <option value="шт">шт</option>
              <option value="м">м</option>
              <option value="л">л</option>
            </select>
          </div>

          <div :class="$style.formGroup">
            <label :class="$style.label">Остаток на начало</label>
            <input 
              type="number"
              v-model="formData.start_balance"
              :class="$style.formInput"
              required
            />
          </div>

          <div :class="$style.formGroup">
            <label :class="$style.label">Приход</label>
            <input 
              type="number"
              v-model="formData.income"
              :class="$style.formInput"
              required
            />
          </div>

          <div :class="$style.formGroup">
            <label :class="$style.label">Расход</label>
            <input 
              type="number"
              v-model="formData.outcome"
              :class="$style.formInput"
              required
            />
          </div>

          <div :class="$style.modalActions">
            <button type="button" :class="$style.cancelButton" @click="closeModal">
              Отмена
            </button>
            <button type="submit" :class="$style.saveButton">
              {{ editingItem ? 'Сохранить' : 'Добавить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style module>
.pageContainer {
  padding: var(--spacing-xxl);
  background-color: var(--color-bg-light);
  min-height: calc(100vh - 60px);
}

.header {
  margin-bottom: var(--spacing-xl);
}

.title {
  font-size: var(--font-size-heading);
  font-weight: 600;
  color: var(--color-text-dark);
  margin: 0;
}

.tabs {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
}

.tab {
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  font-size: var(--font-size-base);
  color: var(--color-text-medium);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab:hover {
  color: var(--color-text-dark);
}

.activeTab {
  color: var(--color-primary) !important;
  font-weight: 500;
}

.activeTab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
}

.filters {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  align-items: center;
}

.dateRange {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dateInput {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-dark);
  background-color: var(--color-bg-white);
  outline: none;
  width: 140px;
}

.input:focus {
  border-color: var(--color-primary);
}

.calendarIcon {
  position: absolute;
  right: var(--spacing-sm);
  color: var(--color-text-light);
  pointer-events: none;
}

.dateSeparator {
  color: var(--color-text-light);
  margin: 0 var(--spacing-xs);
}

.clearButton {
  padding: var(--spacing-sm);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-medium);
  cursor: pointer;
  transition: all 0.2s;
}

.clearButton:hover {
  background-color: var(--color-hover-bg);
}

.searchBox {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.searchIcon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-light);
}

.searchInput {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-dark);
  background-color: var(--color-bg-white);
  outline: none;
}

.searchInput:focus {
  border-color: var(--color-primary);
}

.content {
  margin-top: var(--spacing-lg);
}

.tableHeader {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-md);
}

.addButton {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.addButton:hover {
  background: var(--color-active-blue);
}

.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--color-bg-white);
  padding: var(--spacing-xxl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  width: 90%;
  max-width: 500px;
}

.modalTitle {
  font-size: var(--font-size-large);
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-xl);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.label {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-dark);
}

.formInput {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-dark);
  outline: none;
}

.formInput:focus {
  border-color: var(--color-primary);
}

.modalActions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

.cancelButton {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-bg-light);
  color: var(--color-text-dark);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background 0.2s;
}

.cancelButton:hover {
  background: var(--color-hover-bg);
}

.saveButton {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.saveButton:hover {
  background: var(--color-active-blue);
}

@media (max-width: 768px) {
  .pageContainer {
    padding: var(--spacing-md);
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .searchBox {
    max-width: 100%;
  }
}
</style>