<template>
  <div class="product">
    <div class="product-info-box">
      <div class="product-info-box__box-info">
        <div class="product-info-box__info">
          <icon-button
            @click="removeFromCart(product)"
            class="product-info-box__close-btn"
            styleType="filled"
            varian="rounded"
            iconName="close"
          />
          <div class="product-info-box__image-container">
            <img
              v-if="product?.images"
              class="product-info-box__image"
              :src="product.images.styles[1].url"
              :alt="product.name || 'Product Image'"
            />
            <img
              v-else
              class="product-info-box__image"
              src="../../../assets/images/no-image.png"
              alt="Placeholder"
            />
          </div>
          <p class="product-info-box__caption">{{ product.name }}</p>
          <p class="product-info-box__caption">{{ product.display_price }}</p>
        </div>
        <div>
          <counter-input
            v-model="counter"
            @update:model-value="changeCounter"
            :min="1"
            :max="5"
          />
        </div>
      </div>
      <div class="product-info-box__send-info">
        <base-icon
          class="product-info-box__send-icon"
          icon-name="trunk-fast"
          style-type="outlined"
        />
        <p class="product-info-box__send-info-title">ارسال از ۳ روز آینده</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import IconButton from '@/components/common/button/icon-button.vue';
  import BaseIcon from '@/components/common/icon/base-icon.vue';
  import counterInput from '@/components/common/input/counter-input.vue';
  import { toast } from '@/plugins/toast';


  import { useProductStore } from '@/store/products';

  const productStore = useProductStore();

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const counter = ref(props.product.counter);

  const removeFromCart = (product) => {
    productStore.removeFromCart(product);
     toast.success('محصول از سبد خرید حذف شد')
  };

  const changeCounter = (val) => {
    counter.value = val;
    console.log(val);
    productStore.updateCounter(props.product, val);
  };
</script>

<style scoped lang="scss">
  .product {
    border-bottom: 1px solid var(--palette-gray-4);
  }
  .product-info-box {
    &__info {
      @include flex($align: center);
      gap: space(6);
    }

    &__box-info {
      @include flex($align: center, $justify: space-between);
      padding-right: space(15);
      padding-left: space(6);
    }

    &__image {
      width: 126px;
      height: 120px;
      border-radius: $radius-2x;
    }

    &__caption {
      color: var(--palette-gray-10);
      @include typography(caption-1);
    }

    &__close-btn {
      --base-icon-button-color: var(--palette-gray-9);
    }

    &__send-info {
      @include flex($align: center, $justify: end);
      gap: space(2);
      padding: space(2);
      color: var(--palette-gray-9);
    }

    &__send-info-title {
      @include typography(body-4);
    }

    &__send-icon {
      color: var(--palette-gray-9);
    }
  }
</style>
