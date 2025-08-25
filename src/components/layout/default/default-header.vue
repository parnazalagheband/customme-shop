<template>
  <header class="header">
    <div class="header__logo-container">
      <img class="header__logo" src="@/assets/images/logo.png" />
    </div>
    <div class="header__search-box">
      <search-box />
    </div>
    <base-button leading-icon="login" leading-icon-style-type="outlined">
      ورود | ثبت نام
    </base-button>
    <base-button
    @click="router.push({name:'product-cart'})"
      leading-icon="shopping-cart"
      :badge-value="productStore.totalCount"
      leading-icon-style-type="outlined"
    >
      سبد خرید
    </base-button>
  </header>
</template>

<script setup>
  import { useProductStore } from '@/store/products';
  import SearchBox from '@/components/common/input/search-box.vue';
  import BaseButton from '@/components/common/button/base-button.vue';
  import {useRouter} from 'vue-router';
   const productStore = useProductStore();
  const router = useRouter();
</script>

<style scoped lang="scss">
  .header {
    @include flex($align: center, $justify: space-between);
    background-color: var(--palette-white);
    position:fixed;
    top:0;
    right:0;
    left:0;
    gap:space(10);
    padding: space(7) space(23);
     z-index: 1000;

    &__logo-container {
      min-width: 135px;
    }

    &__search-box{
      flex-grow:1;
    }

  }
</style>
