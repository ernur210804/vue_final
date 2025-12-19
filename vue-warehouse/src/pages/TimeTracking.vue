<script setup>
import { ref } from 'vue';
import { Calendar } from 'lucide-vue-next';

const employees = ref([
  { id: 1, name: 'Иванов И.И.', department: 'Производство', hoursWorked: 160, overtime: 8 },
  { id: 2, name: 'Петров П.П.', department: 'Склад', hoursWorked: 168, overtime: 16 },
  { id: 3, name: 'Сидоров С.С.', department: 'Логистика', hoursWorked: 152, overtime: 0 },
]);

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">Табелирование</h1>
      <div :class="$style.monthSelector">
        <Calendar :size="16" />
        <input type="month" v-model="selectedMonth" :class="$style.monthInput" />
      </div>
    </div>

    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>Сотрудник</th>
            <th>Отдел</th>
            <th>Отработано часов</th>
            <th>Сверхурочные</th>
            <th>Всего</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.hoursWorked }}</td>
            <td :class="$style.overtime">{{ emp.overtime }}</td>
            <td :class="$style.total">{{ emp.hoursWorked + emp.overtime }}</td>
          </tr>
        </tbody>
      </table>
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
}

.monthSelector {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.monthInput {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
}

.tableContainer {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
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
}

.table tbody tr:hover {
  background: var(--color-bg-light);
}

.table td {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-dark);
}

.overtime {
  color: #FF9800;
  font-weight: 500;
}

.total {
  font-weight: 600;
  color: var(--color-primary);
}
</style>