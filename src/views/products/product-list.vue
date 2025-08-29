<template>
  <div class="container">
    <div class="container__filter-box filter-box">
      <filter-box
        :model-value="selectedFilters"
        @update:modelValue="changeFilter"
      />
    </div>
    <div class="container__products-wrapper products-wrapper">
      <sorting-bar
        :model-value="sortBy"
        @update:modelValue="changeSort"
      />
      <div
        :class="[
          'products-wrapper__product-list product-list',
          { 'product-list_empty': !products?.length },
        ]"
      >
        <template v-if="products?.length > 0">
          <main-product
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </template>
        <empty-products v-if="!products?.length && !productStore.loading" />
      </div>

      <PagePagination
        v-if="products?.length > 0"
        class="product-list__pagination"
        :total-pages="productStore.totalPages"
        :model-value="currentPage"
        @update:modelValue="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qs from 'qs';
import { useProductStore } from '@/store/products';
import MainProduct from '@/components/view/products/main-product.vue';
import SortingBar from '@/components/common/button/sorting-bar.vue';
import PagePagination from '@/components/common/button/page-pagination.vue';
import FilterBox from '@/components/common/filter/filter-box.vue';
import EmptyProducts from '@/components/view/products/empty-products.vue';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const itemsPerPage = 9;
const products = ref([]);
const sortBy = ref('all');
const currentPage = ref(1);
const selectedFilters = ref({});


const getProducts = async (page = currentPage.value) => {
  await productStore.getProducts({
    page,
    perPage: itemsPerPage,
    sortBy: sortBy.value,
    filters: selectedFilters.value,
  });
  products.value = productStore.products;
};


onMounted(() => {
  if (route.query.filters) {
    selectedFilters.value = qs.parse(route.query.filters);
  }
  if (route.query.sortBy) {
    sortBy.value = route.query.sortBy;
  }
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  }
  getProducts(currentPage.value);
});


const changeFilter = async (newFilters) => {
  selectedFilters.value = newFilters;
  currentPage.value = 1;
  router.replace({
    query: {
      filters: Object.keys(newFilters).length
        ? qs.stringify(newFilters, { arrayFormat: 'brackets' })
        : undefined,
      sortBy: sortBy.value,
      page: currentPage.value,
    },
  });
  await getProducts(currentPage.value);
};

const changeSort = async (newSort) => {
  sortBy.value = newSort;
  currentPage.value = 1;
  router.replace({
    query: {
      filters: Object.keys(selectedFilters.value).length
        ? qs.stringify(selectedFilters.value, { arrayFormat: 'brackets' })
        : undefined,
      sortBy: newSort,
      page: currentPage.value,
    },
  });
  await getProducts(currentPage.value);
};


const changePage = async (page) => {
  currentPage.value = page;
  router.replace({
    query: {
      filters: Object.keys(selectedFilters.value).length
        ? qs.stringify(selectedFilters.value, { arrayFormat: 'brackets' })
        : undefined,
      sortBy: sortBy.value,
      page,
    },
  });
  await getProducts(page);
};
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
