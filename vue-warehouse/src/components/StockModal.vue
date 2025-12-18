<template>
<div class="overlay">
<div class="modal">
<h3>{{ type === 'IN' ? 'Приход' : 'Расход' }}</h3>


<select v-model="material">
<option value="1">Хлопок</option>
<option value="2">Нить</option>
</select>


<input type="number" v-model="qty" placeholder="Количество" />
<input type="date" v-model="date" />


<div class="actions">
<button @click="$emit('close')">Отмена</button>
<button class="save" @click="save">Сохранить</button>
</div>
</div>
</div>
</template>


<script setup>
import { ref } from 'vue'
const props = defineProps({ type:String })
const emit = defineEmits(['close','saved'])


const material = ref(1)
const qty = ref(0)
const date = ref(new Date().toISOString().slice(0,10))


const save = async () => {
await fetch('/api/warehouse/move', {
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
material_id: material.value,
quantity: qty.value,
type: props.type,
date: date.value
})
})
emit('saved')
emit('close')
}
</script>


<style scoped>
.overlay { position:fixed; inset:0; background:rgba(0,0,0,.3); display:flex; align-items:center; justify-content:center }
.modal { background:#fff; padding:24px; border-radius:12px; width:300px }
.actions { display:flex; justify-content:flex-end; gap:8px }
.save { background:#2563eb; color:#fff }
</style>