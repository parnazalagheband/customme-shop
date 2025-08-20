<template>
  <div class="container">
    <div class="container__filter-box filter-box"></div>

    <div class="container__products-wrapper products-wrapper">
      <sorting-bar @select="sortProducts" />

      <div class="products-wrapper__product-list product-list">
        <MainProduct
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <PagePagination
        class="product-list__pagination"
        :total-pages="productStore.totalPages"
        @changePage="getProducts"
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

const productStore = useProductStore();


const itemsPerPage = 9;
const products = ref();

const getProducts = async (page = 1, sort = 'all') => {
   await productStore.getProducts({ page, perPage: itemsPerPage, sort });
   products.value = productStore.products;
};


const sortProducts = async (sortValue) => {
  await getProducts(1, sortValue);
};

onMounted(() => getProducts());
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
    margin-top: space(7);
  }
}

.product-list {
  @include flex($wrap: wrap);
  gap: space(6);

  &__pagination {
    margin-top: space(10);
  }
}
</style>
