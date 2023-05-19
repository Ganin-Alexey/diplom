/* eslint-disable */
<template>
  <div>
      <router-link :to="{name: 'catalog'}">
      </router-link>
    <router-view />
   </div>
</template>

<script>
  export default {
    name: "v-main-page",
    props: {},
    data() {
      return {}
    },
    computed: {}
  }
</script>

<style scoped>

</style>
