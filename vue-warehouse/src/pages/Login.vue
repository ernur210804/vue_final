<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth/authStore.js';
import { useRouter } from 'vue-router';
import useFormValidation from '../composables/useFormValidation.js';
import BaseButton from '../components/ui/BaseButton.vue';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: '',
  password: ''
});

const { errors, validate } = useFormValidation(form, {
  email: { required: true, email: true },
  password: { required: true }
});

const submit = async () => {
  if (validate()) {
    await authStore.login(form.value);
    if (authStore.isAuthenticated) {
      router.push('/warehouses');
    }
  }
};
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="submit">
      <input v-model="form.email" type="email" placeholder="Email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
      <input v-model="form.password" type="password" placeholder="Password" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
      <BaseButton type="submit" :disabled="authStore.loading">Login</BaseButton>
      <span v-if="authStore.error" class="error">{{ authStore.error }}</span>
    </form>
  </div>
</template>

<style scoped>
.login-container { max-width: 400px; margin: auto; padding: 20px; }
.error { color: red; }
@media (max-width: 768px) { .login-container { padding: 10px; } }
</style>