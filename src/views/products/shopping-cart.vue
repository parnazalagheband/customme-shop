<template>
  <div class="container">
    <div class="products-cart">
      <div class="products-cart-header">سبد خرید</div>
      <div v-if="productStore.cartProducts.length">
        <product-cart
          v-for="product in productStore.cartProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-else class="product-cart-empty">سبد خرید شما خالی است.</div>
    </div>
    <order-invoice class="order-invoice" />
  </div>
</template>

<script setup>
  import ProductCart from '@/components/view/products/product-cart.vue';
  import OrderInvoice from '@/components/view/products/order-invoice.vue';
  import { useProductStore } from '@/store/products';

  const productStore = useProductStore();
</script>

<style scoped lang="scss">
  .container {
    @include flex();
    gap: space(6);
    padding: space(30) space(24);
  }

  .products-cart {
    width: 70%;
  }

  .order-invoice {
    width: 30%;
  }

  .products-cart-header {
    @include typography(body-3);
    padding: space(2) space(6);
    border-bottom: 1px solid var(--palette-gray-4);
  }

  .product-cart-empty {
    @include typography(body-3);
    text-align: center;
    color: var(--palette-gray-9);
  }
</style>
