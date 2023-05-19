<template>
  <div class='v-catalog-item'>
    <div class="col-lg-6 col-md-6">
      <div class="single-product">
        <div class="product-img">
          <a href="product-details.html">
            <img src="@/assets/images/product/l-product-1.jpg" alt="">
          </a>
          <div class="product-action">
            <a href="javascript:void(0)"><i class="lni lni-heart"></i></a>
            <a href="javascript:void(0)" class="share"><i class="lni lni-share"></i></a>
          </div>
        </div>
  
        <div class="product-content">
          <h3 class="name"><a href="product-details.html">Apple iPhone x</a></h3>
          <span class="update">Last Update: 5 hours ago</span>
          <ul class="address">
            <li>
              <a href="javascript:void(0)"><i class="lni lni-calendar"></i> 20 June, 2023</a>
            </li>
            <li>
              <a href="javascript:void(0)"><i class="lni lni-map-marker"></i> Canada</a>
            </li>
            <li>
              <a href="javascript:void(0)"><i class="lni lni-user"></i> Stifen Jon</a>
            </li>
            <li>
              <a href="javascript:void(0)"><i class="lni lni-package"></i> Used</a>
            </li>
          </ul>
          <div class="product-bottom">
            <h3 class="price">$120.99</h3>
            <a href="javascript:void(0)" class="link-ad"><i class="lni lni-checkmark-circle"></i> Verified Ad</a>
          </div>
        </div>
      </div>
    </div>
    <v-popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Add to cart"
        :popupTitle="product_data.name"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
    >
      <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img">
      <div>
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">Price: {{ filter(product_data.price | toFix | formattedPrice) }} Р.</p>
        <p class="v-catalog-item__price">{{product_data.category}}</p>
      </div>
    </v-popup>


    <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img" @click="productClick">
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{filter(product_data.price | toFix | formattedPrice)}}</p>
    <button
        class="v-catalog-item__show-info"
        @click="showPopupInfo"
    >
      Show info
    </button>
    <br>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="addToCart"
    >Add to cart
    </button>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  import toFix from '../../filters/toFix'
  import formattedPrice from "../../filters/price-format";

  export default {
    name: "v-catalog-item",
    components: {
      vPopup
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
        isInfoPopupVisible: false
      }
    },
    filters: {
      toFix,
      formattedPrice
    },
    computed: {},
    methods: {
      productClick() {
        this.$emit('productClick', this.product_data.article)
      },
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.isInfoPopupVisible = false;
      },
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }
    },
    mounted() {
      this.$set(this.product_data, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
      width: 100px;
    }
  }
</style>
