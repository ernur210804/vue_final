import { ref, onMounted } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  onMounted(async () => {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch {
      error.value = 'Fetch error'
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
