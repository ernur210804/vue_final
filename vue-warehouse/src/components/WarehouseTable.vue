<template>
<table class="table">
<thead>
<tr>
<th>Наименование</th>
<th>Ед.</th>
<th>Начало</th>
<th>Приход</th>
<th>Расход</th>
<th>Конец</th>
<th>Дата</th>
</tr>
</thead>
<tbody>
<tr v-for="r in rows" :key="r.name">
<td>{{ r.name }}</td>
<td>{{ r.unit }}</td>
<td>{{ r.start_balance }}</td>
<td class="in">{{ r.income }}</td>
<td class="out">{{ r.outcome }}</td>
<td>{{ r.end_balance }}</td>
<td>{{ r.last_update }}</td>
</tr>
</tbody>
</table>
</template>


<script setup>
defineProps({ rows: Array })
</script>


<style scoped>
.table {
width:100%;
background:#fff;
border-radius:12px;
border-collapse:collapse;
}
th,td { padding:12px; border-bottom:1px solid #eee }
.in { color:green }
.out { color:red }
</style>