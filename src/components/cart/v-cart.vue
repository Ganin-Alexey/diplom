<template>
  <div  v-if="CART.length" class="box-style price-range">
    <h3 class="mb-30">Корзина</h3>
    <div class="collapse show" id="pricingOne">
      <ol class="list-group list-group-numbered">

       

        <a v-for="(product, index) in CART" :key="product.id" class="list-group-item d-flex justify-content-between align-items-start">
          <router-link active-class="false" exact-path-active-class="false" exact-active-class="false" :to="`/product/${product.slug}`">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ product.title }}</div>
              {{ product.price }} ₽/шт.
            </div>
            <span class="badge bg-primary rounded-pill">{{ product.quantity }} шт. - {{ product.quantity *  product.price }} ₽</span>
          </router-link>
          <button type="button" v-on:click.stop="deleteFromCart(index)" class="btn-close p-3" aria-label="Удалить из корзины"></button>
        </a>
      
      </ol>
      <br>
      <div class="d-grid gap-2">
        <li v-if="this.$route.name == 'formOfPayment'" class="list-group-item d-flex justify-content-between">
          <span>Всего</span>
          <strong>{{cartTotalCost}} ₽</strong>
        </li>
        <router-link v-else :to="{name: 'formOfPayment'}" active-class="false" exact-path-active-class="false" exact-active-class="false">
          
            <button class="btn btn-primary" type="button">Оплатить {{cartTotalCost}} ₽</button>
          
        </router-link>
      </div> 
      
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: "v-cart",
    components: {
    },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART',
      ]),
      cartTotalCost() {
        let result = []

        if (this.CART.length) {
          for (let item of this.CART) {
            result.push(item.price * item.quantity)
          }
          result = result.reduce(function (sum, el) {
            return sum + el;
          })
          return result;
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM'
      ]),
      increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index);
        if (this.CART.length == 0  & this.$route.name == 'formOfPayment') {
          this.$router.push({path: '/'});
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
