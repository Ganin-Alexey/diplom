import { createRouter, createWebHistory } from 'vue-router'

// import ProductComp from '@/components/Product'
// import AuthorComp from '@/components/Author'
// import ProductByTagComp from '@/components/ProductByTag'
import AllProductsComp from '@/components/AllProducts'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//       { path: '/author/:id', component: AuthorComp, name: 'author', },
//       { path: '/product/:slug', component: ProductComp, name: 'product' },
//       { path: '/tag/:tag', component: ProductByTagComp, name: 'tag' },
//       { path: '/', component: AllProductsComp, name: 'products' },
//   ],
// })


// import vCatalog from '@/components/catalog/v-catalog'
import vCart from '@/components/cart/v-cart'
import vMainPage from '@/components/main-page/v-main-page'
import vProductPage from '@/components/catalog/v-product-page'
import vFormOfPayment from '@/components/cart/v-form-of-payment'
// import Router from 'vue-router'
// import Vue from 'vue'

// Vue.use(Router);

let router = createRouter({
  history: createWebHistory(),
  routes: 
  // [{
  //   path: '/',
  //   name: 'mainPage',
  //   component: {vMainPage },
  //   meta: { title: 'Документация' },
  //   children: [
  //     {
  //       path: '/catalog',
  //       name: 'catalog',
  //       component: AllProductsComp,
  //       meta: { title: 'Вся документация' },
  //     },
  //     {
  //       path: '/product/:slug',
  //       name: 'product',
  //       component: vProductPage,
  //       meta: { title: 'Добавить документ' },
  //     },
  //     {
  //       path: '/cart',
  //       name: 'cart',
  //       component: vCart,
  //       props: true,
  //       meta: { title: 'Редактировать документ' },
  //     },
  //   ],
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
// }]
})
export default router
