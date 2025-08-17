<template>
  <div class="container">
    <div class="container__filter-box filter-box"></div>
    <div class="container__products-wrapper products-wrapper">
      <sorting-bar @select="filterSelect" />
      <div class="products-wrapper__product-list product-list">
        <MainProduct
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <PagePagination
        class="product-list__pagination"
        v-model="currentPage"
        :total-items="products.length"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useProductStore } from '@/store/products';
  import MainProduct from '@/components/view/products/main-product.vue';
  import SortingBar from '@/components/common/button/sorting-bar.vue';
  import PagePagination from '@/components/common/button/page-pagination.vue';

  const productStore = useProductStore();

  const selectedFilter = ref('all');
  const currentPage = ref(1);
  const itemsPerPage = 9;

  onMounted(async () => {
    await productStore.getProducts();
  });

  const filterSelect = (value) => {
    selectedFilter.value = value;
  };

  const products = computed(() =>
    productStore.sortProducts(selectedFilter.value)
  );

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return products.value.slice(start, start + itemsPerPage);
  });
</script>

<style scoped lang="scss">
  .container {
    @include flex();
    padding: space(30);

    &__products-wrapper {
      width: 80%;
    }

    &__filter-box {
      width: 20%;
    }
  }

  .products-wrapper {
    &__product-list {
      margin-top: space(5);
    }
  }

  .product-list {
    @include flex($wrap: wrap, $justify: space-between);
    gap: space(4);

    &__pagination{
      margin-top:space(10);
    }
  }
</style>
