import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWarehouseStore = defineStore('warehouse', () => {
  const movements = ref([])

  const balance = computed(() =>
    movements.value.reduce((s, m) =>
      m.type === 'in' ? s + m.quantity : s - m.quantity, 0)
  )

  function addMovement(m) {
    movements.value.push(m)
  }

  return { movements, balance, addMovement }
})
