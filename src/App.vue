<template>
  <html class="no-js" lang="ru">
  
  <head>
    <meta charset="utf-8">
  
    <!--====== Title ======-->
    <title>Globus-IT</title>
  
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  
  <body>
    <!--====== PRELOADER PART ENDS ======-->
  
    <!--====== HEADER PART START ======-->
    <loginMenu v-if="this.$store.state.logInMenu"></loginMenu>
    <header class="header_area">
      <div id="header_navbar" class="header_navbar">
        <div class="container position-relative">
          <div class="row align-items-center">
            <div class="col-xl-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="index.html">
                  <router-link :to="{name: 'mainPage'}">
                    <img id="logo" src="@/assets/images/logo/logo_file-2.jpg" alt="Logo">
                  </router-link>
                </a>
                <button class="navbar-toggler mb-3"  style="background-color: #FF6B6B;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" class="navbar-nav ">
                    <li class="nav-item">
                      <router-link style="color: #FF6B6B;" active-class="page-scroll link-item" exact-path-active-class="link-item" exact-active-class="active page-scroll link-item" :to="{name: 'mainPage'}">
                        Продукты
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link @click="getProducts();" style="color: #FF6B6B;" active-class="page-scroll link-item" exact-path-active-class="link-item" exact-active-class=" page-scroll link-item" :to="{name: ''}">
                        Все категории
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link style="color: #FF6B6B;" active-class="page-scroll link-item" exact-path-active-class="link-item" exact-active-class="active page-scroll link-item" :to="{name: 'about'}">
                        О нас
                      </router-link>
                    </li>
                  </ul>
                </div>
                <ul class="header-btn d-md-flex">
                  <li v-if="this.$store.state.user.token">
                    <a href="#"  class="main-btn account-btn">
                      <span class="d-md-none"><i class="lni lni-user"></i></span>
                      <span class="d-none d-md-block">Мой аккаунт</span>
                    </a>
                    <ul class="dropdown-nav">
                       
                      <li v-if="this.USER().data.firstName" >{{ this.USER().data.firstName }} {{ this.USER().data.lastName }}</li>
                      <li v-if="this.USER().data.firstName">{{ this.USER().data.email }}</li>
                      <!-- <li><a href="profile-settings.html">Изменить личные данные</a></li> -->
                      <li><a @click="signOut()" href="javascript:void(0)">Выйти</a></li>
                    </ul>
                  </li>
                  <li v-else>
                    <a @click="this.$store.state.logInMenu = true" href="#" class="main-btn account-btn m-r-2">
                      <span class="d-md-none"><i class="lni lni-user"></i></span>
                      <span class="d-none d-md-block">Войти</span>
                    </a>
                  </li>
                  <li v-if="this.$route.name != 'formOfPayment'">
                    <router-link v-if="this.$store.state.cart.length" :to="{name: 'formOfPayment'}">
                      <button class="main-btn btn-hover d-none d-md-block" type="button">Оформить заказ</button>
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div> 
        </div> 
      </div> 
    </header>
  
    <!--====== HEADER PART ENDS ======-->
  
    <!--====== BANNER PART START ======-->
    <section class="banner-area bg_cover">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="banner-content">
              <!-- <h1 class="link-item">Все товары</h1> -->
              <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <br>
                <br>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link :to="{name: 'mainPage'}">
                      <a style="color: #525252;" active-class="page-scroll link-item" exact-path-active-class="link-item" exact-active-class=" page-scroll link-item" href="index.html">Продукты</a>
                    </router-link>
                  </li>
                  <li v-if="this.$route.name == 'formOfPayment'" style="color: #525252;" active-class="page-scroll link-item" class="breadcrumb-item active" aria-current="page">Корзина</li>
                  <li v-else-if="this.$route.name == 'about' " style="color: #525252;" active-class="page-scroll link-item" class="breadcrumb-item active" aria-current="page">О нас</li>
                  <li v-else-if="this.$route.path != '/'" style="color: #525252;" active-class="page-scroll link-item" class="breadcrumb-item active" aria-current="page">Товар</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--====== BANNER PART END ======-->
  
  
    <!--====== CATEGORY PART START ======-->
    <section class="category-area pb-110">
      <div class="container">
        <!-- category top -->
        <div class="category-top box-style">
          <div class="row align-items-center">
  
            <div class="col-md-6">
              <div class="left-wrapper">
                <div class="sorting">
                  <!-- <label for="sort">Show items</label>
                  <select name="sort" id="sort">
                    <option value="0">Popular Items</option>
                    <option value="1">By Default</option>
                    <option value="2">Newest Items</option>
                  </select> -->
                </div>
              </div>
            </div>
  
            <div  v-if="this.$route.path == '/'" class="col-md-6">
              <div class="right-wrapper">
                
                <ul class="nav product-view-btns" id="myTab" role="tablist">
                  <li class="product-view-item" role="presentation">
                    <a class="product-view-btn" id="list-tab" data-bs-toggle="tab" href="#list" role="tab" aria-controls="list"
                      aria-selected="true"><i class="lni lni-list"></i></a>
                  </li>
                  <li class="product-view-item" role="presentation">
                    <a class="product-view-btn active" id="grid-tab" data-bs-toggle="tab" href="#grid" role="tab" aria-controls="grid"
                      aria-selected="false"><i class="lni lni-grid-alt"></i></a>
                  </li>
                </ul>
  
                <form @submit.prevent="" novalidate>
                  <input v-model="query" type="text" name="search" id="search" placeholder="Поиск">
                  <button  v-on:click.stop="findProducts(query);"><i class="lni lni-search-alt"></i></button>
                </form>
              </div>
            </div>
  
          </div>
        </div>
  
        <!-- category wrapper -->
        <div class="category-wrapper">
          <div class="row">
            <router-view v-if="this.$router.path != '/'"></router-view>
            <!-- left-wrapper  -->
            <div v-if="this.$route.path == '/'" class="col-lg-8">
              <div class="left-wrapper">
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="grid" role="tabpanel" aria-labelledby="grid-tab">
                    <div class="row">
                      <vCatalog :listView=false :allProducts=allProducts></vCatalog>
                    </div>
                  </div>
  
  
                  <div class="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
  
                    <div class="row">
                      <vCatalog :listView=true :allProducts=allProducts></vCatalog>
                    </div>
  
                  </div>
                </div>

              </div>
            </div>
  
            <!-- sidebar wrapper  -->
            <div  v-if="this.$route.name != 'formOfPayment' & this.$route.name != 'about'" class="col-lg-4">
              <div class="sidebar-wrapper">
                <!-- CART  -->
                <vCart></vCart>
  
                <!-- sidebar category  -->
                <vCategories  v-if="this.$router.path != '/'"></vCategories>
  
                <!-- social box -->
                <div class="box-style social-box">
                  <h3 class="mb-30">Подписывайтесь на нас</h3>
  
                  <ul class="social">
                    <li><a href="https://ru-ru.facebook.com/"><i class="lni lni-facebook-filled"></i></a></li>
                    <li><a href="https://twitter.com/?lang=ru"><i class="lni lni-twitter-filled"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i class="lni lni-instagram-filled"></i></a></li>
                    <li><a href="https://ru.linkedin.com/"><i class="lni lni-linkedin-original"></i></a></li>
                  </ul>
                </div>
  
              </div>
            </div>
  
          </div>
        </div>
  
      </div>
    </section>
    <!--====== CATEGORY PART END ======-->
    <!-- <vFormOfPayment></vFormOfPayment>    -->
    <!--====== BACK TOP TOP PART START ======-->
    <a href="#" class="back-to-top btn-hover"><i class="lni lni-chevron-up"></i></a>
    <!--====== BACK TOP TOP PART ENDS ======-->
  </body>
  </html>
</template>


<script>
  import gql from 'graphql-tag'
  import vCart from '@/components/cart/v-cart'
  import vProductPage from '@/components/catalog/v-product-page'
  import vCategories from '@/components/catalog/v-categories'
  import vCatalog from '@/components/catalog/v-catalog'
  import vFormOfPayment from '@/components/cart/v-form-of-payment'
  import loginMenu from '@/components/v-log-in-menu'
  import {mapGetters, mapActions} from 'vuex'


  export default {
    name: 'App',
    components: {
      vCatalog,
      vCategories,
      vCart,
      vFormOfPayment,
      loginMenu
    },
    data () {
    return {
        allProducts: null,
        userValid: false,
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'SET_USER_TO_STATE',
      'SET_SIGN_OUT',
      ]),
    ...mapGetters([
      'CART',
      'USER',
      'PRODUCTS',
    ]),
    async FIND_PRODUCTS(query) {
      return await this.$apollo.query({
        // Query
        query: gql`query ($query: String!) {
          productsSearch (query: $query) {
            id
            title
            price
            description
            publishDate
            dateModified
            published
            metaDescription
            slug
            photo
            company {
              id
              name
            }
            languages {
              nameEn
            }
            operatingSystems {
              name
            }
            tags {
              id
              name
            }
          }
        }`,
        // Parameters
        variables: {
          query: query,
        },
      }).then((result) => {
        // Result
        console.log(result);
        return result;
        }).catch((error) => {
          console.log(error);
          return null;
        })
    },
    async findProducts(query){
    let result = await this.FIND_PRODUCTS(query);
    this.$store.commit('SET_PRODUCTS_TO_STATE', result.data.productsSearch);
    },
    getProducts(){
      return this.GET_PRODUCTS_FROM_API()
    },
    getUser() {
      if (this.USER.token) {
        this.GET_USER_FROM_API(this.USER.token)
        this.userValid = true;
        return true
      }
      return false
    },
    signOut() {
      this.$store.commit('SET_USER_TO_STATE', {token: null, data: null});
    }
  },
  computed: {
    
  },

  compatConfig: { MODE: 3 },
  created () {
    this.$store.state.logInMenu = false;
    // this.getUser()
  },
  }
  </script>

<style lang="scss">
@import '@/assets/styles/styles.scss';
.app {
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  min-height: 100%;
}

.head {
  width: 100%;
  min-height: 150px;
}

.game-store {
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  flex-wrap: nowrap;
}
.group-30 {
  background: $dark-grey;
  background-color: $dark-grey;
  align-items: flex-start;
  position: absolute;
}
.healthiconsui-user-profile {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 90px;
  top: 484px;
}

.frame {
  padding: 4px;
  position: relative;
}
.group {
  width: 40px;
  height: 40px;
  position: relative;
}
.clip0-16-49 {
  width: 23px;
  height: 48px;
  position: absolute;
  left: 25px;
  top: 0;
}
.group-31 {
  background-color: $light_dart;
  border-radius: 0px 0px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  max-width: 330px;
  min-width: 330px;
  left: 0;
  bottom: 0;
}
.flex-wrapper-nine {
  margin-bottom: 56px;
  display: flex;
  align-items: flex-start;
}
.icon-park-solidgame-ps {
  margin-right: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
}
.svgi-da {
  width: 40px;
  height: 40px;
}
.group-12 {
  margin-top: 10px;
  padding: 16px 0 0 23px;
  position: relative;
}
.game {
  font-family: "Quicksand";
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: #DA00FE;
  position: absolute;
  left: 0;
  top: 0;
}
.store {
  font-family: "Quicksand";
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: #A100ED;
  position: relative;
}
.frame-2 {
  background-color: $gray-ico;
  margin-bottom: 66px;
  margin-left: 64px;
  border-radius: 16px;
  padding: 12px 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.catalog {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
}
.group-1 {
  margin-bottom: 48px;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.group-two {
  width: 32px;
  height: 32px;
  margin-right: 26px;
}
.profile {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
}
.bxssearch {
  margin-right: 26px;
  padding: 2.67px 4.39px 4.39px 2.67px;
  display: flex;
  align-items: center;
}
.vector {
  width: 100%;
  height: 100%;
}
.group-5 {
  margin-bottom: 48px;
  margin-left: 34px;
  display: flex;
  align-items: flex-start;
}
.vector-two {
  width: 15.89%;
  height: 73.33%;
  margin-top: 2px;
  margin-right: 30px;
}
.group-4 {
  margin-bottom: 58px;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.icround-account-balance-wallet {
  margin-right: 26px;
  padding: 4px 2.67px 4px 4px;
  display: flex;
  align-items: center;
}
.vector-three {
  flex: 1;
  align-self: stretch;
  object-fit: cover;
}
.flex-wrapper-ten {
  margin-bottom: 32px;
  padding: 0 0 0 32px;
  display: flex;
  align-items: center;
}
.category {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  color: $light-grey;
  margin-right: 155px;
}
.emojione-monotonered-triangle-pointed-u {
  padding: 0.63px 0.62px 0.62px 0.63px;
  display: flex;
  align-items: center;
}
.group-6 {
  margin-bottom: 32px;
  margin-left: 32px;
  display: flex;
  align-items: center;
}
.emojione-monotonedesktop-computer {
  margin-right: 24px;
  padding: 1px;
  position: relative;
}
.vector-four {
  width: 100%;
  height: 100%;
  position: relative;
}
.vector-five {
  width: 2.94%;
  height: 2.94%;
  background-color: $gray-ico;
  border-radius: 50%;
  position: absolute;
  left: 15.53px;
  bottom: 7.56px;
}
.computer {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: $gray-ico;
}
.biheadphones {
  margin-right: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
}
.biheadset-vr {
  margin-right: 24px;
  padding: 0 0 8px;
  display: flex;
  align-items: flex-start;
}
.group-three {
  width: 32px;
  height: 24px;
}
.group-9 {
  margin-left: 32px;
  display: flex;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-bottom: 31px;
  }
}
.bimouse-fill {
  margin-right: 24px;
  padding: 0 6px;
  display: flex;
  align-items: flex-start;
}
.keyboard {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: $gray-ico;
  margin-top: 3px;
}
.bikeyboard-fill {
  margin-right: 24px;
  padding: 8px 0 6px;
  display: flex;
  align-items: center;
}
.mouse-gaming {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: $gray-ico;
  margin-top: 4px;
}
.product {
  width: 107px;
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 700;
  line-height: 26px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 435px;
  top: 480px;
  letter-spacing: 0.96px;
}
.group-15 {
  padding: 27px 5px 31px 0;
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 76px;
  top: 120px;
}
.unsplash-zf0m-pf4lg-u {
  top: 0;
}
.flex-wrapper-two {
  padding: 5px 4px 0 0;
  position: relative;
}
.rectangle-4 {
  width: 890px;
  height: 273px;
  background: linear-gradient(
    180deg,
    rgba(161, 0, 237, 0.27) 0%,
    $purple-light 100%
  );
  border-radius: 16px;
  position: relative;
  backdrop-filter: blur(599px);
}
.rectangle-5 {
  width: 890px;
  height: 268px;
  position: absolute;
  right: 0;
  top: 0;
}
.group-13 {
  display: flex;
  align-items: flex-start;
  position: absolute;
  left: 406px;
  bottom: 17px;
}
.ellipse-1 {
  width: 12px;
  height: 12px;
  background-color: $purple-dark;
  margin-right: 21px;
  border-radius: 50%;
}
.ellipse-2 {
  width: 12px;
  height: 12px;
  background-color: rgba(217, 217, 217, 1);
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 21px;
  }
}
.oculus-vr-virtual-reality {
  width: 304px;
  text-shadow: 0 1px 8px $gray-3;
  position: absolute;
  left: 52px;
  top: 42px;
  font-family: "Quicksand";
  font-size: 32px;
  font-weight: 400;
  line-height: 34px;
  color: rgba(255, 255, 255, 1);
}
.oculus-vr-virtual-reality-emphasis-0 {
  font-family: "Quicksand";
  font-size: 40px;
  font-weight: 400;
  line-height: 43px;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1.6px;
}
.oculus-vr-virtual-reality-emphasis-1 {
  font-family: "Quicksand";
  font-size: 40px;
  font-weight: 400;
  line-height: 43px;
  color: $purple-light;
  letter-spacing: 1.6px;
}
.frame-14 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 52px;
  bottom: 32px;
}
.entyposhop {
  margin-right: 8px;
  padding: 2.4px 1.2px;
  display: flex;
  align-items: center;
  width: 21.6px;
  height: 19.2px;
}
.vector-six {
  height: 100%;
  flex: 1;
  object-fit: cover;
}
.order-now {
  font-family: "Quicksand";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: $purple-light;
  letter-spacing: 0.64px;
}
.vr-box-360-original-complete-geme-vr-gam {
  height: 40px;
  width: 224px;
  color: rgba(255, 255, 255, 1);
  display: flex;
  position: absolute;
  left: 52px;
  top: 141px;
  letter-spacing: 0.48px;
  @include roboto-12-bold;
}
.frame-21 {
  padding: 0 0 169px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  right: 73px;
  bottom: 154px;
}
.frame-19 {
  display: flex;
  align-items: flex-end;
}
.group-23 {
  background-color: rgba(50, 50, 50, 1);
  margin-right: 16px;
  border-radius: 8px;
  padding: 16px 39px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-3 {
  width: 142px;
  height: 100px;
  margin-bottom: 17px;
}
.lexma-g88 {
  font-family: "Inter";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 8px;
}
.mouse {
  font-family: "Inter";
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  color: $gray-ico;
  margin-bottom: 17px;
}
.num-22-69 {
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  color: $purple-light;
  margin-bottom: 15px;
}
.group-16 {
  display: flex;
  align-items: center;
}
.ant-designplus-circle-filled {
  margin-right: 4px;
  padding: 1.5px;
  display: flex;
  align-items: center;
}
.add-to-cart {
  font-family: "Inter";
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
}
.group-22 {
  margin-right: 16px;
  padding: 17px 0 0;
  position: relative;
}
.image-1 {
  width: 200px;
  height: 142px;
  position: absolute;
  left: 10px;
  top: 0;
}
.flex-wrapper-three {
  background-color: rgba(50, 50, 50, 1);
  border-radius: 8px;
  padding: 134px 67px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.keyboard-two {
  font-family: "Inter";
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  color: $gray-ico;
  margin-bottom: 17px;
  margin-left: 20px;
}
.num-20-88 {
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  color: $purple-light;
  margin-bottom: 15px;
  margin-left: 22px;
}
.group-21 {
  margin-right: 16px;
  padding: 40px 0 0;
  position: relative;
}
.image-4 {
  width: 180px;
  height: 169px;
  position: absolute;
  left: 22px;
  top: 0;
}
.headset {
  font-family: "Inter";
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  color: $gray-ico;
  margin-bottom: 17px;
  margin-left: 23px;
}
.group-18 {
  margin-left: 1px;
  display: flex;
  align-items: center;
}
.group-20 {
  padding: 43px 0 0;
  position: relative;
}
.image-5 {
  width: 180px;
  height: 180px;
  left: 20px;
  top: 0;
}
.flex-wrapper-five {
  background-color: $light_dart;
  border-radius: 8px;
  padding: 134px 67px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.frame-20 {
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: 0;
  top: 307px;
}
.frame-15 {
  background-color: $purple-dark;
  border-radius: 16px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 435px;
  top: 522px;
}
.top {
  font-family: "Inter";
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  color: rgba(255, 255, 255, 1);
}
.frame-16 {
  border-radius: 16px;
  padding: 7px 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 509px;
  top: 522px;
  border: 1px solid $gray-ico;
}
.frame-17 {
  border-radius: 16px;
  padding: 7px 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 604px;
  top: 520px;
  border: 1px solid $gray-ico;
}
.group-28 {
  border-radius: 8px;
  padding: 6px 22px 5px 7px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 625px;
  top: 520px;
  border: 1px solid $purple-light;
}
.vector-seven {
  width: 30.43%;
  align-self: stretch;
  margin-right: 8px;
  object-fit: cover;
}
.ellipse-4 {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 40px;
  top: 15px;
  border-radius: 50%;
}
.group-29 {
  padding: 6px 6px 0 0;
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 104px;
  top: 20px;
}
.fashopping-basket {
  padding: 0 2px 2px 0;
  position: relative;
}
.frame-18 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  padding: 2px 3.5px 3px 4.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 18px;
  top: 0;
}
.num-2 {
  height: 10px;
  width: 6px;
  font-family: "Roboto";
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  color: $purple-light;
  display: flex;
}
.cinotification {
  padding: 2.25px 4.34px 1.22px 4.33px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 152px;
  top: 23px;
}
.vector-eight {
  width: 100%;
  align-self: stretch;
  object-fit: cover;
}
.frame-13 {
  background-color: rgba(95, 95, 95, 0.35);
  border-radius: 16px;
  padding: 12px 224px 12px 24px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 469px;
  top: 40px;
}
.bxssearch-two {
  margin-right: 24px;
  padding: 2.67px 4.39px 4.39px 2.67px;
  display: flex;
  align-items: center;
}
.search {
  font-family: "Quicksand";
  font-size: 24px;
  font-weight: 500;
  line-height: normal;
  color: rgba(255, 255, 255, 0.5);
}
.frame-18-two {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  padding: 2px 3.5px 3px 4.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 149px;
  top: 20px;
}
</style>