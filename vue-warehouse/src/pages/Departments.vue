<script setup>
import { ref } from 'vue';
import { Plus, Edit2, Trash2 } from 'lucide-vue-next';

const departments = ref([
  { id: 1, name: 'Производство', manager: 'Иванов И.И.', employees: 15 },
  { id: 2, name: 'Склад', manager: 'Петров П.П.', employees: 8 },
  { id: 3, name: 'Логистика', manager: 'Сидоров С.С.', employees: 5 },
]);

const showModal = ref(false);
const editingDept = ref(null);
const formData = ref({ name: '', manager: '', employees: 0 });

const openAddModal = () => {
  editingDept.value = null;
  formData.value = { name: '', manager: '', employees: 0 };
  showModal.value = true;
};

const openEditModal = (dept) => {
  editingDept.value = dept;
  formData.value = { ...dept };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingDept.value = null;
};

const saveDepartment = () => {
  if (editingDept.value) {
    const index = departments.value.findIndex(d => d.id === editingDept.value.id);
    departments.value[index] = { ...editingDept.value, ...formData.value };
  } else {
    departments.value.push({
      id: Date.now(),
      ...formData.value
    });
  }
  closeModal();
};

const deleteDepartment = (id) => {
  if (confirm('Удалить отдел?')) {
    departments.value = departments.value.filter(d => d.id !== id);
  }
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">Отделы</h1>
      <button :class="$style.addButton" @click="openAddModal">
        <Plus :size="16" />
        Добавить отдел
      </button>
    </div>

    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Руководитель</th>
            <th>Сотрудников</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in departments" :key="dept.id">
            <td>{{ dept.name }}</td>
            <td>{{ dept.manager }}</td>
            <td>{{ dept.employees }}</td>
            <td>
              <div :class="$style.actions">
                <button :class="$style.actionBtn" @click="openEditModal(dept)">
                  <Edit2 :size="16" />
                </button>
                <button :class="$style.actionBtn" @click="deleteDepartment(dept.id)">
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
          {{ editingDept ? 'Редактировать отдел' : 'Добавить отдел' }}
        </h2>
        <form @submit.prevent="saveDepartment" :class="$style.form">
          <div :class="$style.formGroup">
            <label>Название</label>
            <input v-model="formData.name" :class="$style.formInput" required />
          </div>
          <div :class="$style.formGroup">
            <label>Руководитель</label>
            <input v-model="formData.manager" :class="$style.formInput" required />
          </div>
          <div :class="$style.formGroup">
            <label>Количество сотрудников</label>
            <input type="number" v-model="formData.employees" :class="$style.formInput" required />
          </div>
          <div :class="$style.modalActions">
            <button type="button" :class="$style.cancelButton" @click="closeModal">Отмена</button>
            <button type="submit" :class="$style.saveButton">
              {{ editingDept ? 'Сохранить' : 'Добавить' }}
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