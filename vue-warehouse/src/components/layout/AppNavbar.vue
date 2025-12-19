<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth/authStore.js';
import { useRouter } from 'vue-router';
import { UserCircle, Bell } from 'lucide-vue-next';

const authStore = useAuthStore();
const router = useRouter();

const isAuth = computed(() => authStore.isAuthenticated);
const userInfo = computed(() => ({
  role: 'Администратор',
  company: 'ТОО Tashe1',
  username: authStore.user?.email || 'Пользователь'
}));

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <nav :class="$style.navbar">
    <div :class="$style.leftSection">
      <Bell :class="$style.notificationIcon" :size="20" />
      <span :class="$style.notificationText">@bpms_notifications_bot</span>
    </div>
    
    <div v-if="isAuth" :class="$style.rightSection">
      <div :class="$style.userInfo">
        <span :class="$style.infoItem">
          <span :class="$style.label">Должность:</span>
          <span :class="$style.value">{{ userInfo.role }}</span>
        </span>
        <span :class="$style.infoItem">
          <span :class="$style.label">Компания:</span>
          <span :class="$style.value">{{ userInfo.company }}</span>
        </span>
      </div>
      <div :class="$style.userAvatar">
        <UserCircle :size="32" :class="$style.avatarIcon" />
        <span :class="$style.username">Пользователь: Ал</span>
      </div>
    </div>
  </nav>
</template>

<style module>
.navbar {
  height: 60px;
  background-color: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xxl);
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  z-index: 100;
}

.leftSection {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.notificationIcon {
  color: var(--color-primary);
}

.notificationText {
  color: var(--color-primary);
  font-size: var(--font-size-base);
}

.rightSection {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.userInfo {
  display: flex;
  gap: var(--spacing-xl);
}

.infoItem {
  display: flex;
  gap: var(--spacing-xs);
  font-size: var(--font-size-base);
}

.label {
  color: var(--color-text-medium);
}

.value {
  color: var(--color-text-dark);
  font-weight: 500;
}

.userAvatar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.avatarIcon {
  color: var(--color-primary);
}

.username {
  font-size: var(--font-size-small);
  color: var(--color-text-medium);
}

@media (max-width: 768px) {
  .navbar {
    left: 0;
    flex-direction: column;
    height: auto;
    padding: var(--spacing-md);
  }
  
  .userInfo {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>