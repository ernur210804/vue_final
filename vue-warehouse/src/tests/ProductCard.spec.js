import { mount } from '@vue/test-utils'
import ProductCard from '../components/ProductCard.vue'

test('renders product title', () => {
  const wrapper = mount(ProductCard, {
    props: { product: { title: 'Test', price: 10 } }
  })
  expect(wrapper.text()).toContain('Test')
})
