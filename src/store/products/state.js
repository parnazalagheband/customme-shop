export const state = () => ({
  products: [],
  filterOptions:null,
  totalPages:null,
  images:[],
  cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
  loading: false,
});
