export default  {
  SEARCH_VALUE(state) {
    return state.searchValue;
  },
  IS_MOBILE(state) {
    return state.isMobile;
  },
  IS_DESKTOP(state) {
    return state.isDesktop;
  },
  PRODUCTS(state) {
    return state.products;
  },
  TAGS(state) {
    return state.tags;
  },
  CART(state) {
    return state.cart;
  },
  USER: (state) => {
    return state.user;
  },
  BACKEND_URL(state) {
    return state.backendUrl;
  }
}
