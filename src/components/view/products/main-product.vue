<template>
  <div class="product">
    <div class="product__image-container">
      <img
        v-if="product?.image"
        class="product__image"
        :src="product.image"
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
      <div class="product-info__description">
        {{ truncate(product.description, 35) }}
      </div>
      <div class="product-info__price">
        <base-button :disabled="!product.purchasable" class="product-info__buy" variant="outlined"
          >خرید</base-button
        >
        <span>{{ product.display_price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import BaseHeart from '@/components/common/button/base-heart.vue';
  import BaseButton from '@/components/common/button/base-button.vue';

  defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const likeStatus = ref(false);
  const truncate = (text, length) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent.length > length
      ? ' ... ' + div.textContent.substring(0, length)
      : div.textContent;
  };
</script>

<style scoped lang="scss">
  .product {
    border: 1px solid var(--palette-gray-5);
    border-radius: $radius-4x;
    padding: space(5);

    &__image-container {
      width: 280px;
      height: 280px;
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
      @include typography(body-4);
    }

    &__price {
      @include typography(heading-5);
      width:100%;
      @include flex($justify: space-between, $align:center);
    }

    &__buy {
      --base-button-color: var(--palette-primary);
    }
  }
</style>
