<template>
    Author!!!
  <div v-if="author">
    <h2>{{ displayName }}</h2>
    <a
      :href="author.website"
      target="_blank"
      rel="noopener noreferrer"
    >Website</a>
    <p>{{ author.bio }}</p>

    <h3>Products by {{ displayName }}</h3>
    <ProductList :products="author.productSet" :showAuthor="false" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import gql from 'graphql-tag'

export default {
  name: 'AuthorComp',
  components: {
    ProductList,
  },
  data () {
    return {
      author: null,
    }
  },
  computed: {
    displayName () {
      return `${this.author.id}`
    },
  },
  async created () {
    const user = await this.$apollo.query({
      query: gql`query ($id: ID!) {
        authorById(id: $id) {
          website
          bio
          productSet {
            title
            publishDate
            published
            metaDescription
            slug
            tags {
              name
            }
          }
        }
      }`,
      variables: {
        id: this.$route.params.id,
      },
    })
    this.author = user.data.authorById
  },
}



</script>