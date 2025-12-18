import { ref, onMounted } from 'vue';

export default function useFetch(fetchFn) {
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      await fetchFn();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  return { loading, error };
}