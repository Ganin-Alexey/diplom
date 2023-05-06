<template>
  <div>
    <h2>Recent products</h2>
    AllProducts
    <ProductList v-if="allProducts" :products="allProducts" />
    {{ allProducts }}
  </div>
</template>

<script>

import ProductList from '@/components/ProductList'
import gql from 'graphql-tag'

export default {
  name: 'AllProductsComp',
  components: {
    ProductList,
  },
  data () {
    return {
        allProducts: null,
    }
  },
    async created () {
    const products = await this.$apollo.query({
      query: gql`query {
        allProducts {
          title
          publishDate
          published
          metaDescription
          slug
          author {
            bio
            id
          }
          tags {
            name
          }
        }
      }`,
    })
    this.allProducts = products.data.allProducts
  },
}
</script>