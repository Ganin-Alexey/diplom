<template>
  <div>
    <h2>Products in #{{ $route.params.tag }}</h2>
    <ProductList :products="products" v-if="products" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'ProductsByTagComp',
  components: {
    ProductList,
  },
  data () {
    return {
      products: null,
    }
  },
}
</script>