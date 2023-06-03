<template>             
    <div v-if="TAGS.length" class="box-style sidebar-category">
        <h3 class="mb-30">Все категории</h3>
        <ul>
            <li v-for="tag in TAGS" :key="tag.id"><a v-on:click="getProductsByTag(tagId=tag.id);" href="javascript:void(0)"><span>{{ tag.nameTag }}</span> <span class="right">{{ tag.countProducts }}</span></a></li>
        </ul>
      </div>
</template>
  
  <script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
      name: "v-catalog-item",
      components: {
      },
      props: {
        product_data: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      data() {
        return {
        }
      },
      computed: {
        ...mapGetters([
        'TAGS',
      ]),
      },
      methods: {
        ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'GET_TAGS_FROM_API',
        'ADD_TO_CART',
        ]),
        getProductsByTag(tagId){
            this.GET_PRODUCTS_FROM_API(tagId)
                .then((response) => {
                if (response.data) {
                    this.$router.push({ name: 'mainPage' });
                    this.$emit("sortByCategories");
                    this.$emit("sortProductsBySearchValue", this.SEARCH_VALUE);
                }
            })
        }
      },
      mounted() {
        this.tags = [this.TAGS]
      }
    }
  </script>
  
  <style lang="scss">

  </style>
  