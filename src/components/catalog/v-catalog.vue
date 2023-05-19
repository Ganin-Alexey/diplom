<template>
    <!-- Col view -->
      <div v-if="!this.PRODUCTS.length"><h3>Товары не найдены, попробуйте поискать в других категориях!</h3></div>
      
        <div class="col-lg-6 col-md-6" v-for="product in  this.PRODUCTS" :key="product.id">
          
            <div class="single-product" v-if="!listView">
              <router-link :to="`/product/${product.slug}`">
                <div class="product-img">
                  <a>
                    <img width="350" height="260" :src="BACKEND_URL + product.photo" :alt="product.slug">
                  </a>
                  <div class="product-action">
                    <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
                    <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
                  </div>
                </div>
              </router-link>
              
              <div class="product-content">
                <router-link :to="`/product/${product.slug}`">
                  <h3 class="name"><a>{{ product.title }}</a></h3>
                  <span class="update">Последнее обновление: {{convertDate(product.dateModified)}}</span>
                  <ul class="address">
                    <li>
                      <a href="javascript:void(0)"><i class="lni lni-calendar"></i> {{convertDate(product.publishDate)}}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="lni lni-map-marker"></i> <i  v-for="lang in  product.languages" :key="lang.nameEn">{{lang.nameEn}} </i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="lni lni-user"></i> {{ product.company.name }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="lni lni-package"></i> <i  v-for="tag in  product.tags" :key="tag.id">{{tag.name}} </i></a>
                    </li>
                  </ul>
                </router-link>    
                <div class="product-bottom ">
                  <h3 class="price">{{product.price}} ₽</h3>
                  <a v-on:click.stop="productClick(product)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Добавить в корзину </a>
                </div>
              </div>
            </div>
          
        </div>
      
    <!--  List view  -->
    <div v-if="listView">
      <div class="col-lg-12" v-for="product in  this.PRODUCTS" :key="product.id">
        <div class="single-product list-view">
          <div class="product-img">
            <a href="product-details.html">
              <!-- <img src="@/assets/images/product/l-product-6.jpg" :alt="product.slug"> -->
              <img :src="BACKEND_URL + product.photo" :alt="product.slug">
            </a>
            <div class="product-action">
              <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
              <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
            </div>
          </div>
    
          <div class="product-content">
            <h3 class="name"><a href="product-details.html">{{ product.title }}</a></h3>
            <span class="update">Последнее обновление : {{convertDate(product.dateModified)}}</span>
            <ul class="address">
              <li>
                <a href="javascript:void(0)"><i class="lni lni-calendar"></i> {{convertDate(product.publishDate)}}</a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-map-marker"></i> <i  v-for="lang in  product.languages" :key="lang.nameEn">{{lang.nameEn}} </i></a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-user"></i> {{ product.company.name }}</a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-package"></i> <i  v-for="tag in  product.tags" :key="tag.id">{{tag.name}} </i></a>
              </li>
            </ul>
            <div class="product-bottom">
              <h3 class="price">{{product.price}} ₽  </h3>
              <button v-on:click.stop="productClick(product)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Добавить в корзину</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  // import vCatalogItem from './v-catalog-item'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "v-catalog",
    components: {
      // vCatalogItem,
    },
    props: ['allProducts', 'listView'],
    data() {
      return {
        selected: 'Все',
        sortedProducts: [],
        minPrice: 0,
        maxPrice: 10000,
        messages: [],
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART',
        'TAGS',
        'IS_MOBILE',
        'IS_DESKTOP',
        'SEARCH_VALUE',
        'BACKEND_URL',
      ]),
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          return this.PRODUCTS
        }
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'GET_TAGS_FROM_API',
        'ADD_TO_CART',
      ]),
      convertDate(date){
        return (new Date(date)).toLocaleDateString() 
      },
      productClick(product) {
        this.ADD_TO_CART(product);
        console.log(this.CART);
      },
      setRangeSlider() {
        if (this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.sortByCategories()
      },
      sortByCategories(category) {
        let vm = this;
        this.sortedProducts = [...this.PRODUCTS]
        this.sortedProducts = this.sortedProducts.filter(function (item) {
          return item.price >= vm.minPrice && item.price <= vm.maxPrice
        })
        if (category) {
          this.sortedProducts = this.sortedProducts.filter(function (e) {
            vm.selected === category.name;
            return e.category === category.name
          })
        }
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
          .then(() => {
            let timeStamp = Date.now().toLocaleString();
            this.messages.unshift(
              {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
            )
          })
      },
      sortProductsBySearchValue(value) {
        this.sortedProducts = [...this.PRODUCTS]
        if (value) {
          this.sortedProducts = this.sortedProducts.filter(function (item) {
            return item.name.toLowerCase().includes(value.toLowerCase())
          })
        } else {
          this.sortedProducts = this.PRODUCTS;
        }
      }
    },
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          console.log('response', response);
          if (response.data) {
            console.log('true', response.data);
            this.sortByCategories()
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        })
      this.GET_TAGS_FROM_API()
      .then((response) => {
        console.log('response', response);
        if (response.data) {
          console.log('true', response.data);
        }
      })
    }
  }
</script>

<style lang="scss">
  .easynetshop-3 {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: "Nunito", "Helvetica", "Arial", sans-serif;
    color: #000000;
    line-height: 1.42857143;
    font-weight: normal;
    font-size: 14px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: center;
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 5px;
    padding-left: 5px;
    box-sizing: border-box;
    width: 25%;
  }
  .easynetshop-self-quant-input {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    width: 25px;
    margin: 0px 2px 0px 2px;
    border: 1px solid #dad9d5;
    text-align: center;
  }
  .easynetshop-self-plus-quant {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    background: #fff;
    border: 1px solid #dad9d5;
    width: 25px;
    margin: 0;
    padding: 1px 6px;
    line-height: 18.5714px;
  }

  .easynetshop-self-minus-quant {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    background: #fff;
    border: 1px solid #dad9d5;
    width: 25px;
    margin: 0;
    padding: 1px 6px;

  }
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    &__link_to_cart {
      position: fixed;
      top: 80px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px #aeaeae;
      background: #ffffff;
    }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
  .number {
    position: relative;
    text-align: left;
    padding: 0;
    width: 140px;
    border: 1px solid #ddd;
    display: inline-block;
}
.number-minus, .number-plus {
    position: absolute;
    top: 0;
    width: 40px;
    height: 32px;
    line-height: 32px;
    display: block;
    background: #faf4f2;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    font-family: arial;
    color: #3e1e02;
    text-decoration: none;
}
.number-minus {
    left: 0;
    border-right: 1px solid #ddd;
}
.number-plus {
    right: 0;
    border-left: 1px solid #ddd;
}
.number-minus:hover, .number-plus:hover {
    background: #fffcfb;
}
.number-minus:active, .number-plus:active {
    background: #e8e4e2;
}
.number-text{
    display: inline-block;
    font-size: 14px;
    color: #000;
    line-height: 32px;
    height: 32px;
    padding: 0;
    margin: 0 0 0 42px;
    background: #fff;
    outline: none;
    border: none;
    width: 57px;
    text-align: center;
}
</style>
