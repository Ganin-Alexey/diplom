// import { createApp,h } from 'vue'
// import App from './App.vue'
// import router from './router'
// import { ApolloClient, InMemoryCache } from '@apollo/client/core'
// import { createApolloProvider } from '@vue/apollo-option'

// import { BootstrapVue } from 'bootstrap-vue'


// const cache = new InMemoryCache()

// const apolloClient = new ApolloClient({
//   cache,
//   uri: 'http://localhost:8000/graphql',
// })

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// })


// const app = createApp({
//   render: () => h(App),
// }).use(router)

// // app.use(BootstrapVue)
// app.use(router)
// app.use(apolloProvider)
// app.mount('#app')


import * as Vue from 'vue';
import App from './App.vue';
 

Vue.createApp(App).mount('#app');