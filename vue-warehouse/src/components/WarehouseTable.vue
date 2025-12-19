<script setup>
import { Edit2, Trash2 } from 'lucide-vue-next';

defineProps({ 
  rows: { type: Array, default: () => [] }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div :class="$style.tableContainer">
    <table :class="$style.table">
      <thead>
        <tr>
          <th>Наименование сырья</th>
          <th>Единица измерений</th>
          <th>Остаток на начало</th>
          <th>Приход</th>
          <th>Расход</th>
          <th>Остаток на конец</th>
          <th>Дата изменений</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="row.id || index">
          <td>{{ row.name }}</td>
          <td>{{ row.unit }}</td>
          <td>{{ row.start_balance }}</td>
          <td :class="$style.income">{{ row.income }}</td>
          <td :class="$style.outcome">{{ row.outcome }}</td>
          <td>{{ row.end_balance }}</td>
          <td>{{ row.last_update }}</td>
          <td>
            <div :class="$style.actions">
              <button :class="$style.actionBtn" @click="emit('edit', row)" title="Редактировать">
                <Edit2 :size="16" />
              </button>
              <button :class="$style.actionBtn" @click="emit('delete', row.id)" title="Удалить">
                <Trash2 :size="16" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module>
.tableContainer {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
}

.table thead {
  background-color: var(--color-bg-white);
  border-bottom: 2px solid var(--color-border);
}

.table th {
  padding: var(--spacing-md) var(--spacing-lg);
  text-align: left;
  font-weight: 600;
  color: var(--color-text-dark);
  font-size: var(--font-size-base);
  white-space: nowrap;
}

.table tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s;
}

.table tbody tr:hover {
  background-color: var(--color-bg-light);
}

.table tbody tr:nth-child(even) {
  background-color: #FAFAFA;
}

.table tbody tr:nth-child(even):hover {
  background-color: var(--color-bg-light);
}

.table td {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-dark);
}

.income {
  color: #4CAF50;
  font-weight: 500;
}

.outcome {
  color: #F44336;
  font-weight: 500;
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
  justify-content: center;
}

.actionBtn:hover {
  background: var(--color-hover-bg);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .tableContainer {
    overflow-x: auto;
  }
  
  .table {
    min-width: 800px;
  }
}
</style>