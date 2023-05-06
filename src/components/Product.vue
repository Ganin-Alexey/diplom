<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="product" v-if="product">
      <h2>{{ product.title }}: {{ product.subtitle }}</h2>
      By <AuthorLink :author="product.author" />
      <div>{{ displayableDate(product.publishDate) }}</div>
    <p class="product__description">{{ product.metaDescription }}</p>
    <article>
      {{ product.body }}
    </article>
    <ul>
      <li class="product__tags" v-for="tag in product.tags" :key="tag.name">
        <router-link :to="`/tag/${tag.name}`">#{{ tag.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import AuthorLink from '@/components/AuthorLink'

export default {
  name: 'ProductComp',
  components: {
    AuthorLink,
  },
  data () {
    return {
      products: null,
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