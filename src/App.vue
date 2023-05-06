<template>
  <html lang="ru">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <title>Демо Bootstrap</title>
    </head>
    <body>
      <div id="app" class="main_rectangle darkg_grey">
        <header>
            <router-link to="/">
                <h1>
                    Awesome Blog
                </h1>
            </router-link>
        </header>
        <router-view />
        <div class="nav-group nav-rectangle"></div>
      </div>
    </body>

  </html>
</template>

<script>
import vCart from '@/components/cart/v-cart'
import vMainPage from '@/components/main-page/v-main-page'
import vProductPage from '@/components/catalog/v-product-page'

export default {
  name: 'App',
  components: {
    vMainPage,
  },
  compatConfig: { MODE: 3 }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* Group 30 */
#app {
position: absolute;
width: 1440px;
height: 1178px;
left: 0px;
top: 0px;
}

/* Rectangle 2 */
.main_rectangle {
position: absolute;
width: 1422px;
height: 1178px;
left: 9px;
top: -3px;
}
/* Dark Grey */
.darkg_grey{
background: #242424;
}

/* Group 31 */
.nav-group {
position: absolute;
width: 363px;
height: 1178px;
left: 0px;
top: 3px;
}


/* Rectangle 3 */
.nav-rectangle {
position: absolute;
width: 363px;
height: 1178px;
left: 0px;
top: 3px;
background: #2D2D2D;
border-radius: 0px 0px 16px 0px;
}
</style>
