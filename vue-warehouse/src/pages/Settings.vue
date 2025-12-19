<script setup>
import { ref } from 'vue';
import { Save } from 'lucide-vue-next';

const settings = ref({
  companyName: 'ТОО Tashe1',
  email: 'info@tashe1.kz',
  phone: '+7 (777) 123-45-67',
  address: 'г. Алматы, ул. Примерная, 123',
  currency: 'KZT',
  language: 'ru',
  timezone: 'Asia/Almaty'
});

const saveSettings = () => {
  alert('Настройки сохранены!');
};
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Настройки</h1>

    <div :class="$style.settingsCard">
      <h2 :class="$style.sectionTitle">Информация о компании</h2>
      <form @submit.prevent="saveSettings" :class="$style.form">
        <div :class="$style.formGroup">
          <label :class="$style.label">Название компании</label>
          <input v-model="settings.companyName" :class="$style.input" />
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label">Email</label>
          <input type="email" v-model="settings.email" :class="$style.input" />
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label">Телефон</label>
          <input v-model="settings.phone" :class="$style.input" />
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label">Адрес</label>
          <textarea v-model="settings.address" :class="$style.textarea" rows="3"></textarea>
        </div>
      </form>
    </div>

    <div :class="$style.settingsCard">
      <h2 :class="$style.sectionTitle">Региональные настройки</h2>
      <form @submit.prevent="saveSettings" :class="$style.form">
        <div :class="$style.formGroup">
          <label :class="$style.label">Валюта</label>
          <select v-model="settings.currency" :class="$style.input">
            <option value="KZT">Тенге (KZT)</option>
            <option value="USD">Доллар США (USD)</option>
            <option value="EUR">Евро (EUR)</option>
          </select>
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label">Язык</label>
          <select v-model="settings.language" :class="$style.input">
            <option value="ru">Русский</option>
            <option value="kk">Қазақша</option>
            <option value="en">English</option>
          </select>
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label">Часовой пояс</label>
          <select v-model="settings.timezone" :class="$style.input">
            <option value="Asia/Almaty">Алматы (GMT+6)</option>
            <option value="Asia/Aqtobe">Актобе (GMT+5)</option>
          </select>
        </div>
      </form>
    </div>

    <button :class="$style.saveButton" @click="saveSettings">
      <Save :size="16" />
      Сохранить настройки
    </button>
  </div>
</template>

<style module>
.container {
  padding: var(--spacing-xxl);
  max-width: 800px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-xxl);
}

.settingsCard {
  background: var(--color-bg-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

.sectionTitle {
  font-size: var(--font-size-large);
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-lg);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.label {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-dark);
}

.input, .textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  outline: none;
}

.input:focus, .textarea:focus {
  border-color: var(--color-primary);
}

.saveButton {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.saveButton:hover {
  background: var(--color-active-blue);
}
</style>