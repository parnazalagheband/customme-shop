import { createRouter, createWebHistory } from 'vue-router';

const ProductList = () => import('@/views/products/product-list.vue');
const ProductCart = () => import('@/views/products/shopping-cart.vue');


const routes = [
  { path: '/', redirect: '/product-list' },
  { path: '/product-list', name: 'product-list', component: ProductList },
  { path: '/cart', name: 'product-cart', component: ProductCart },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
