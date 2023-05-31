import { createRouter, createWebHistory } from 'vue-router'
import AllProductsComp from '@/components/AllProducts'
import vCart from '@/components/cart/v-cart'
import vMainPage from '@/components/main-page/v-main-page'
import vProductPage from '@/components/catalog/v-product-page'
import vFormOfPayment from '@/components/cart/v-form-of-payment'

let router = createRouter({
  history: createWebHistory(),
  routes: 
  [
      {
        path: '/',
        name: 'mainPage',
        component: vMainPage
      },
      {
        path: '/catalog',
        name: 'catalog',
        component: AllProductsComp
      },
      {
        path: '/product/:slug',
        name: 'product',
        component: vProductPage
      },
      {
        path: '/cart',
        name: 'cart',
        component: vCart,
        props: true
      },
      {
        path: '/form-of-payment',
        name: 'formOfPayment',
        component: vFormOfPayment,
      },
  ]
})
export default router
