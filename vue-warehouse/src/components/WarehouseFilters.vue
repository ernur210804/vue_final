<template>
<div class="filters">
<input type="date" v-model="from" />
<input type="date" v-model="to" />


<select v-model="warehouse">
<option :value="1">Склад сырья</option>
<option :value="2">Склад ГП</option>
</select>


<button class="in" @click="$emit('add-in')">+ Приход</button>
<button class="out" @click="$emit('add-out')">− Расход</button>
</div>
</template>


<script setup>
const from = defineModel('from')
const to = defineModel('to')
const warehouse = defineModel('warehouse')
</script>


<style scoped>
.filters {
display: flex;
gap: 12px;
margin-bottom: 16px;
}
button.in { background:#2563eb; color:#fff }
button.out { background:#dc2626; color:#fff }
</style>