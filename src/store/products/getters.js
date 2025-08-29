export const getters = {
  totalCount: (state) =>
    state.cartProducts.reduce((sum, p) => +p.counter + sum, 0),

  getProductCounter: (state) => {
    return (productId) => {
      const item = state.cartProducts.find((p) => p.id === productId);
      if (!item) {
        return 0;
      }
      return item.counter || 0;
    };
  },

  getTotalPrice: (state) =>
    Number(
      state.cartProducts
        .reduce((sum, p) => parseFloat(p.price) * Number(p.counter) + sum, 0)
        .toFixed(2)
    ),
};
