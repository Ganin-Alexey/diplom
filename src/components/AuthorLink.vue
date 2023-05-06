<template>
    AuthorLink
  <router-link
      :to="`/author/${author.id}`"
  >{{ displayName }}</router-link>
</template>

<script>
export default {
  name: 'AuthorLink',
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayName () {
        return `${this.author.bio}`
    },
  },
}
</script>