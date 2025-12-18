<script setup>
import { ref } from 'vue';
import { useWarehouseStore } from '../../stores/warehouse/warehouseStore.js';
import { useProductStore } from '../../stores/product/productStore.js';
import useFormValidation from '../../composables/useFormValidation.js';
import BaseButton from '../ui/BaseButton.vue';

defineProps({
  warehouseId: { type: String, required: true }
});
defineEmits(['success']);

const store = useWarehouseStore();
const productStore = useProductStore();

const form = ref({
  product_id: '',
  quantity: 0,
  price: 0,
  date: new Date().toISOString().slice(0, 10)
});

const { errors, validate } = useFormValidation(form, {
  product_id: { required: true },
  quantity: { required: true },
  price: { required: true }
});

const submit = async () => {
  if (validate()) {
    form.value.warehouse_id = props.warehouseId;
    await store.createOutgoing(form.value);
    emit('success');
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <select v-model="form.product_id">
      <option value="">Выберите товар</option>
      <option v-for="prod in productStore.getProducts" :key="prod.id" :value="prod.id">{{ prod.name }}</option>
    </select>
    <span v-if="errors.product_id" class="error">{{ errors.product_id }}</span>
    <input v-model="form.quantity" type="number" placeholder="Количество" />
    <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
    <input v-model="form.price" type="number" placeholder="Цена" />
    <span v-if="errors.price" class="error">{{ errors.price }}</span>
    <input v-model="form.date" type="date" />
    <BaseButton type="submit">Создать расход</BaseButton>
  </form>
</template>

<style scoped>
form { max-width: 400px; margin: 20px 0; }
input, select { display: block; margin: 10px 0; }
.error { color: red; }
@media (max-width: 768px) { form { padding: 10px; } }
</style>