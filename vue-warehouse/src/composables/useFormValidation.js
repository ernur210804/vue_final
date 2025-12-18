import { reactive } from 'vue';

export default function useFormValidation(form, rules) {
  const errors = reactive({});

  const validate = () => {
    Object.keys(rules).forEach(key => {
      errors[key] = null;
      if (rules[key].required && !form.value[key]) {
        errors[key] = 'Required';
      }
      if (rules[key].email && form.value[key] && !/\S+@\S+\.\S+/.test(form.value[key])) {
        errors[key] = 'Invalid email';
      }
    });
    return Object.values(errors).every(e => !e);
  };

  return { errors, validate };
}