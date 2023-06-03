import { createRouter, createWebHistory } from 'vue-router'
import vCart from '@/components/cart/v-cart'
import vMainPage from '@/components/main-page/v-main-page'
import vProductPage from '@/components/catalog/v-product-page'
import vFormOfPayment from '@/components/cart/v-form-of-payment'
import vAbout from '@/components/v-about'

let router = createRouter({
  history: createWebHistory(),
  routes: 
  [
      {
        path: '/',
        name: 'mainPage',
        component: vMainPage
      },
      // {
      //   path: '/catalog',
      //   name: 'catalog',
      //   component: AllProductsComp
      // },
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
        path: '/about',
        name: 'about',
        component: vAbout,
        props: false
      },
      {
        path: '/form-of-payment',
        name: 'formOfPayment',
        component: vFormOfPayment,
      },
  ]
})
export default router
