export const getters = {
  totalCount: (state) =>
    state.cartProducts.reduce((sum, item) => +item.counter + sum, 0),
};
