<template>
  <nav class="nav">
    <router-link to="/warehouses">Warehouses</router-link>
    <router-link to="/login">Login</router-link>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 12px;
  background: #2c3e50;
}
a {
  color: white;
  text-decoration: none;
}
</style>
