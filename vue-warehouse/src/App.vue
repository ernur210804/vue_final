<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from './components/layout/AppNavbar.vue';
import AppSidebar from './components/layout/AppSidebar.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>

<template>
  <div :class="$style.app">
    <template v-if="!isLoginPage">
      <AppSidebar />
      <div :class="$style.mainLayout">
        <AppNavbar />
        <main :class="$style.mainContent">
          <router-view></router-view>
        </main>
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<style module>
.app {
  min-height: 100vh;
  background-color: var(--color-bg-light);
}

.mainLayout {
  margin-left: 220px;
}

.mainContent {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

@media (max-width: 768px) {
  .mainLayout {
    margin-left: 0;
  }
}
</style>