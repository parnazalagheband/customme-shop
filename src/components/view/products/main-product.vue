<template>
  <div class="product">
    <div class="product__image-container">
      <img
        v-if="product?.images"
        class="product__image"
        :src="product.images.styles[2].url"
        :alt="product.name || 'Product Image'"
      />
      <img
        v-else
        class="product__image"
        src="../../../assets/images/no-image.png"
        alt="Placeholder"
      />
    </div>

    <div class="product__info product-info">
      <div class="product-info__name">
        <base-heart v-model="likeStatus" />
        <span>{{ product.name }}</span>
      </div>
      <div v-html="product.description" class="product-info__description"></div>
      <div class="product-info__price">
        <counter-input
          v-model="productCounter"
          @update:model-value="changeCounter"
          :min="0"
          :max="5"
        />
        <span>{{ product.display_price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useProductStore } from '@/store/products';
  import BaseHeart from '@/components/common/button/base-heart.vue';
  import counterInput from '@/components/common/input/counter-input.vue';
  // import { toast } from '@/plugins/toast';

  const productStore = useProductStore();

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const likeStatus = ref(false);
  const productCounter = ref(productStore.getProductCounter(props.product.id));

  const changeCounter = (val) => {
    productStore.updateCounter(props.product, val);
  };
</script>

<style scoped lang="scss">
  .product {
    border: 1px solid var(--palette-gray-5);
    border-radius: $radius-4x;
    padding: space(4);
    flex: 0 0 calc(33.333% - #{space(4)});
    max-width: calc(33.333% - #{space(4)});

    &__image-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: $radius-2x;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__info {
      margin-top: space(2);
    }
  }

  .product-info {
    @include flex(column, $align: end);
    gap: space(3);
    &__name {
      width: 100%;
      @include typography(heading-6);
      @include flex($justify: space-between);
    }

    &__description {
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      direction: ltr;
      text-overflow: ellipsis;
    }

    &__price {
      @include typography(heading-5);
      width: 100%;
      @include flex($justify: space-between, $align: center);
    }
  }
</style>
