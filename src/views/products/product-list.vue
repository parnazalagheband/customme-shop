<template>
  <div class="container">
    <div class="container__filter-box filter-box">
      <filter-box @filter="filterProducts" />
    </div>
    <div class="container__products-wrapper products-wrapper">
      <sorting-bar @select="sortProducts" />
      <div
        :class="[
          'products-wrapper__product-list product-list',
          { 'product-list_empty': !products?.length },
        ]"
      >
        <template v-if="products?.length > 0">
          <MainProduct
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </template>
        <empty-products v-else />
      </div>

      <PagePagination
        v-if="products?.length > 0"
        class="product-list__pagination"
        :total-pages="productStore.totalPages"
        v-model="currentPage"
        @update:modelValue="getProducts"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '@/store/products';
  import MainProduct from '@/components/view/products/main-product.vue';
  import SortingBar from '@/components/common/button/sorting-bar.vue';
  import PagePagination from '@/components/common/button/page-pagination.vue';
  import FilterBox from '@/components/common/filter/filter-box.vue';
  import EmptyProducts from '@/components/view/products/empty-products.vue';

  const productStore = useProductStore();

  const itemsPerPage = 9;
  const products = ref();
  const sortBy = ref('all');
  const currentPage = ref(1);
  const filterOption = ref({});

  const getProducts = async (page = 1) => {
    await productStore.getProducts({
      page,
      perPage: itemsPerPage,
      sortBy: sortBy.value,
      filters: filterOption.value,
    });
    products.value = productStore.products;
  };

  const sortProducts = async (sortValue) => {
    sortBy.value = sortValue;
    currentPage.value = 1;
    await getProducts(1);
  };

  const filterProducts = async (option) => {
    currentPage.value = 1;
    filterOption.value = option;
    await getProducts(1);
  };

  onMounted(() => getProducts());
</script>

<style scoped lang="scss">
  .container {
    @include flex();
    gap: space(5);
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
      margin-top: space(7);
    }
  }

  .product-list {
    @include flex($wrap: wrap);
    gap: space(6);

    &__pagination {
      margin-top: space(10);
    }

    &_empty {
      @include flex($justify: center, $align: center);
    }
  }
</style>
