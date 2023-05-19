<template>
  <div class="col-lg-8 v-product-page">
    <div class="left-wrapper">
      <div class="tab-content">
        <div class="">
          <div class="row">
            
            <div class="card mb-3">
              <img class="v-catalog-item__image" :src="BACKEND_URL + product.photo" alt="img">
              <div class="card-body">
                <h5 class="card-title">{{product.title}}</h5>
                <p class="card-text">{{product.description}}</p>
                <ul class="address">
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-calendar"></i> Последнее обновление:  {{convertDate(product.dateModified)}}</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Поддерживаемые языки: <i  v-for="lang in  product.languages" :key="lang.nameEn">{{lang.nameEn}} </i></a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-user"></i> <i> Создатель: {{ product.company.name }} </i></a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-package"></i> <i  v-for="tag in  product.tags" :key="tag.id"> {{tag.name}} </i> </a>
                  </li>
                </ul>
                <h3 class="price">{{product.price}} ₽</h3>
                <p class="card-text"><small class="text-muted"> Последнее обновление:  {{convertDate(product.dateModified)}}</small></p>
              </div>
              <button class="btn btn-primary" @click="addToCart" type="button">Добавить в корзину</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "v-product-page",
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'BACKEND_URL',
        'PRODUCTS'
      ]),
      product() {
        let result = {}
        let vm = this;
        this.PRODUCTS.find(function (item) {
          if (item.slug === vm.$route.params.slug) {
            result = item;
          }
        })
        return result;
      }
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      convertDate(date){
        return (new Date(date)).toLocaleDateString() 
      },
      addToCart() {
        this.ADD_TO_CART(this.product)
      },
    },
    mounted() {
      if (!this.PRODUCTS.length) {
        this.GET_PRODUCTS_FROM_API()
      }
    }
  }
</script>

<style scoped>

</style>
