import { createApp,h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import { BootstrapVue } from 'bootstrap-vue'
import { createHttpLink } from 'apollo-link-http'
// Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  uri: 'http://localhost:8000/graphql',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

// import VueApollo from 'vue-apollo'
const app = createApp({
  render: () => h(App),
})
app.component('VueDatePicker', VueDatePicker);
// app.use(BootstrapVue)
app.use(store)
app.use(router)
app.use(apolloProvider)
// app.use(VueApollo)
app.use(vuetify)
app.mount('#app')


// import Vuex, { mapActions as mA, mapGetters as mG, mapState as mS, createNamespacedHelpers as cNH } from 'vuex'
// import gql from 'graphql-tag'
// import createStore from './vuex/store'
// import createApollo from './apollo/index'


// const VuexApollo = {
//     install (Vue, options) {
//         Vue.use(Vuex)
//         const apollo = createApollo(options)
//         const store = createStore(Vuex, { apollo, gql })

//         options.modules.forEach(module => store.registerModule(module.name, module.store))

//         Vue.prototype.$store = store
//     }
// }

// export const mapActions = mA
// export const mapGetters = mG
// export const mapState = mS
// export const createNamespacedHelpers = cNH

// export default VuexApollo

import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/css/style.css';
import '@/assets/images/favicon.png';
import '@/assets/css/animate.css';
import '@/assets/css/tiny-slider.css';
import '@/assets/css/glightbox.min.css';
import '@/assets/css/LineIcons.2.0.css';
import '@/assets/css/selectr.css';
import '@/assets/css/nouislider.css';
import '@/assets/css/bootstrap-5.0.5-alpha.min.css';
const bootstrap = require('bootstrap');
bootstrap;
