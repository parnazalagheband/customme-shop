import { createRouter, createWebHistory } from 'vue-router';

const ProductList = () => import('@/views/products/product-list.vue');

const routes = [
  { path: '/', redirect: '/product-list' },
  { path: '/product-list', name: 'product-list', component: ProductList },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
