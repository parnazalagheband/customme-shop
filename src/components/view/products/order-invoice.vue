<template>
  <div class="order-invoice">
    <div class="order-invoice__discount discount">
      <p class="discount__title">کد تخفیف</p>
      <div class="discount__caption">
        کد تخفیف کد معرف کارت هدیه خود را در زیر وارد کرده و دکمه ثبت را بزنید
        تا در صورت داشتن اعتبار به سفارش شما اعمال شود
      </div>
      <div class="discount__code">
        <text-field class="discount__input" />
        <base-button variant="outlined" class="discount__submit"
          >ثبت</base-button
        >
      </div>
    </div>
    <div class="order-invoice__detail">
      <div>
        <p>قیمت کالاها</p>
        <div>
          <span class="order-invoice__count">تعداد کالا</span>
          <span></span>
        </div>
      </div>
      <p>${{ productStore.getTotalPrice }}</p>
    </div>
    <div class="order-invoice__detail">
      <div class="order-invoice__total-discount-title">
        <base-icon
          class="order-invoic__recepite-icon"
          icon-name="recepite-discount"
          style-type="outlined"
        />
        <span>مجموع تخفیف روی کالاها</span>
      </div>
      <div>
        <span>$</span>
        <span class="order-invoice__total-discount">0</span>
      </div>
    </div>
    <div class="order-invoice__detail">
      <span>سود شما از خرید</span>
      <span>$0</span>
    </div>
    <div class="order-invoice__detail order-invoice__shipping-cost">
      <span>هزینه ارسال</span>
      <span>$0</span>
    </div>
    <div class="order-invoice__detail order-invoice__total">
      <span>جمع مبلغ قابل پرداخت</span>
      <span>${{ productStore.getTotalPrice }}</span>
    </div>
    <base-button
      variant="filled"
      trailing-icon="arrow-left"
      trailing-icon-style-type="filled"
      class="order-invoice__submit-order"
      >ثبت سفارش</base-button
    >
  </div>
</template>

<script setup>
  import BaseButton from '@/components/common/button/base-button.vue';
  import BaseIcon from '@/components/common/icon/base-icon.vue';
  import TextField from '@/components/common/field/text-field.vue';
  import { useProductStore } from '@/store/products';
  const productStore = useProductStore();
</script>

<style scoped lang="scss">
  .order-invoice {
    @include flex($dir: column);
    gap: space(3);
    padding: space(6);
    border: 1px solid var(--palette-gray-4);
    border-radius: $radius-4x;
    width: 100%;

    &__detail {
      @include flex($justify: space-between, $align: center);
      @include typography(body-4);
      color: var(--palette-gray-9);
      width: 100%;
    }

    &__count {
      @include typography(caption-4);
    }

    &__submit-order {
      @include typography(button-2);
      --base-button-color: var(--palette-primary);
      --base-icon-button-color: var(--palette-white);
      width: 100%;
      margin-top: space(2);
    }

    &__shipping-cost {
      border-bottom: 1px solid var(--palette-gray-4);
      padding-bottom: space(2);
    }

    &__total-discount {
      color: var(--palette-error-light);
    }

    &__total-discount-title {
      @include flex($align: center);
      gap: space(1);
    }

    &__total {
      @include typography(body-3);
    }

    &__recepite-icon {
      color: var(--palette-gray-9);
    }
  }

  .discount {
    @include flex($dir: column);
    gap: space(2);
    border-bottom: 1px solid var(--palette-gray-4);
    padding: space(3) space(2);

    &__title {
      @include typography(body-4);
    }

    &__caption {
      @include typography(caption-4);
    }

    &__code {
      @include flex($justify: space-between);
      gap: space(2);
      width: 100%;
    }

    &__input {
      width: 100%;
      --base-height: 40px;
      --base-radius: 8px;
    }

    &__submit {
      --base-button-color: var(--palette-primary);
      width: 80px;
    }
  }
</style>
