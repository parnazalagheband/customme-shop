export const getters = {
  totalCount: (state) =>
    state.cartProducts.reduce((sum, item) => +item.counter + sum, 0),

  getProductCounter: (state) => {
    return (productId) => {
      const item = state.cartProducts.find((p) => p.id === productId);
      if (!item) {
        return 0;
      }
      return item.counter || 0;
    };
  },
};
