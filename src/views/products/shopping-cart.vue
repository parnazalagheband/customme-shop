<template>
  <div class="container">
    <div class="products-cart">
      <div class="products-cart-header">سبد خرید</div>
      <product-cart
        v-for="product in productStore.cartProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
  import ProductCart from '@/components/view/products/product-cart.vue';
  import { useProductStore } from '@/store/products';

  const productStore = useProductStore();
</script>

<style scoped lang="scss">
  .container {
    padding: space(30);
  }

  .products-cart {
    display: flex;
    width: 70%;
    flex-direction: column;
    gap: space(6);
  }

  .products-cart-header {
    @include typography(body-3);
    padding: space(2) space(6);
    border-bottom: 1px solid var(--palette-gray-4);
  }
</style>
