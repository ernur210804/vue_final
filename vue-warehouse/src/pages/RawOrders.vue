<script setup>
import { ref } from 'vue';
import { Plus, Edit2, Trash2 } from 'lucide-vue-next';

const orders = ref([
  { id: 1, product: 'Битум', quantity: 500, unit: 'кг', supplier: 'ООО Поставщик 1', status: 'В обработке', date: '2025-12-20' },
  { id: 2, product: 'Бумага', quantity: 1000, unit: 'кг', supplier: 'ООО Поставщик 2', status: 'Доставлен', date: '2025-12-18' },
]);

const showModal = ref(false);
const editingOrder = ref(null);
const formData = ref({ product: '', quantity: 0, unit: 'кг', supplier: '', status: 'В обработке', date: '' });

const openAddModal = () => {
  editingOrder.value = null;
  formData.value = { product: '', quantity: 0, unit: 'кг', supplier: '', status: 'В обработке', date: new Date().toISOString().split('T')[0] };
  showModal.value = true;
};

const openEditModal = (order) => {
  editingOrder.value = order;
  formData.value = { ...order };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingOrder.value = null;
};

const saveOrder = () => {
  if (editingOrder.value) {
    const index = orders.value.findIndex(o => o.id === editingOrder.value.id);
    orders.value[index] = { ...editingOrder.value, ...formData.value };
  } else {
    orders.value.push({ id: Date.now(), ...formData.value });
  }
  closeModal();
};

const deleteOrder = (id) => {
  if (confirm('Удалить заказ?')) {
    orders.value = orders.value.filter(o => o.id !== id);
  }
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">Заказы сырья</h1>
      <button :class="$style.addButton" @click="openAddModal">
        <Plus :size="16" />
        Создать заказ
      </button>
    </div>

    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Количество</th>
            <th>Ед. изм.</th>
            <th>Поставщик</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.product }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.unit }}</td>
            <td>{{ order.supplier }}</td>
            <td>
              <span :class="order.status === 'Доставлен' ? $style.statusDelivered : $style.statusPending">
                {{ order.status }}
              </span>
            </td>
            <td>{{ order.date }}</td>
            <td>
              <div :class="$style.actions">
                <button :class="$style.actionBtn" @click="openEditModal(order)">
                  <Edit2 :size="16" />
                </button>
                <button :class="$style.actionBtn" @click="deleteOrder(order.id)">
                  <Trash2 :size="16" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" :class="$style.modalOverlay" @click="closeModal">
      <div :class="$style.modal" @click.stop>
        <h2 :class="$style.modalTitle">
          {{ editingOrder ? 'Редактировать заказ' : 'Создать заказ' }}
        </h2>
        <form @submit.prevent="saveOrder" :class="$style.form">
          <div :class="$style.formGroup">
            <label>Товар</label>
            <input v-model="formData.product" :class="$style.formInput" required />
          </div>
          <div :class="$style.formGroup">
            <label>Количество</label>
            <input type="number" v-model="formData.quantity" :class="$style.formInput" required />
          </div>
          <div :class="$style.formGroup">
            <label>Единица измерения</label>
            <select v-model="formData.unit" :class="$style.formInput">
              <option value="кг">кг</option>
              <option value="г">г</option>
              <option value="шт">шт</option>
              <option value="м">м</option>
            </select>
          </div>
          <div :class="$style.formGroup">
            <label>Поставщик</label>
            <input v-model="formData.supplier" :class="$style.formInput" required />
          </div>
          <div :class="$style.formGroup">
            <label>Статус</label>
            <select v-model="formData.status" :class="$style.formInput">
              <option>В обработке</option>
              <option>Доставлен</option>
              <option>Отменен</option>
            </select>
          </div>
          <div :class="$style.formGroup">
            <label>Дата</label>
            <input type="date" v-model="formData.date" :class="$style.formInput" required />
          </div>
          <div :class="$style.modalActions">
            <button type="button" :class="$style.cancelButton" @click="closeModal">Отмена</button>
            <button type="submit" :class="$style.saveButton">
              {{ editingOrder ? 'Сохранить' : 'Создать' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  padding: var(--spacing-xxl);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-dark);
  margin: 0;
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

.tableContainer {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: var(--color-bg-white);
  border-bottom: 2px solid var(--color-border);
}

.table th {
  padding: var(--spacing-md) var(--spacing-lg);
  text-align: left;
  font-weight: 600;
  color: var(--color-text-dark);
}

.table tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background 0.2s;
}

.table tbody tr:hover {
  background: var(--color-bg-light);
}

.table td {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-dark);
}

.actions {
  display: flex;
  gap: var(--spacing-xs);
}

.actionBtn {
  padding: var(--spacing-xs);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-medium);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.actionBtn:hover {
  background: var(--color-hover-bg);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.statusDelivered {
  padding: 4px 8px;
  background: #4CAF50;
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.statusPending {
  padding: 4px 8px;
  background: #FF9800;
  color: white;
  border-radius: 4px;
  font-size: 12px;
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
  cursor: pointer;
}

.saveButton {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
}

.saveButton:hover {
  background: var(--color-active-blue);
}
</style>