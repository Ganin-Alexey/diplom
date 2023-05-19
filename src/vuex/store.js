
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import commonActions from './actions/actions'
import apiRequests from './actions/api-requests'
import mutations from "./mutations/mutations"
import getters from "./getters/getters";

const actions = {...commonActions, ...apiRequests}
import { createApp } from "vue";
const app = createApp({});
app.use(Vuex);

let store = new Vuex.Store({
  state: {
    searchValue: '',
    isMobile: false,
    isDesktop: true,
    products: [],
    cart: [],
    tags: [],

    backendUrl: 'http://localhost:8000/media/',
  },
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()]
});

export default store;

// import { version } from '../../package.json'
// import apolloGqlPlugin from './plugins/apollo-gql-plugin'

// export default (Vuex, { apollo, gql }) => {
//     const store = new Vuex.Store({
//         state: { version },
//         plugins: [apolloGqlPlugin],
//         // mutations,
//         // actions,
//         // getters,
//     })
//     store.$apollo = apollo
//     store.$gql = gql

//     return store
// }