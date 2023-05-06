<template>
  <div>
    F1
    <ol class="product-list">
      <li class="product" v-for="product in publishedProducts" :key="product.title">
          ProductList
          <span class="product__title">
            <router-link
              :to="`/product/${product.slug}`"
            >{{ product.title }}: {{ product.subtitle }}</router-link>
          </span>
          <span v-if="showAuthor">
            by <AuthorLink :author="product.author" />
          </span>
          <div class="product__date">{{ displayableDate(product.publishDate) }}</div>
        <p class="product__description">{{ product.metaDescription }}</p>
        <ul>
          <li class="product__tags" v-for="tag in product.tags" :key="tag.name">
            <router-link :to="`/tag/${tag.name}`">#{{ tag.name }}</router-link>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
import AuthorLink from '@/components/AuthorLink'

export default {
  name: 'ProductList',
  components: {
    AuthorLink,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    publishedProducts () {
      return this.products.filter(product => product.published)
    }
  },
  methods: {
    displayableDate (date) {
      return new Intl.DateTimeFormat(
        'en-US',
        { dateStyle: 'full' },
      ).format(new Date(date))
    }
  },
}
</script>

<style>
.product-list {
  list-style: none;
}

.product {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.product__title {
  font-size: 1.25rem;
}

.product__description {
  color: #777;
  font-style: italic;
}

.product__tags {
  list-style: none;
  font-weight: bold;
  font-size: 0.8125rem;
}
</style>