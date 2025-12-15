import { setActivePinia, createPinia } from 'pinia'
import { useWarehouseStore } from '../store/warehouseStore'

test('adds product', () => {
  setActivePinia(createPinia())
  const store = useWarehouseStore()
  store.addProduct({ title: 'Item' })
  expect(store.products.length).toBe(1)
})
