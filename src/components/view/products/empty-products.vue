<template>
  <div class="empty-product">
    <img class="empty-product__image" src="@/assets/images/not-found.png"/>
    <p class="empty-product__text">نتیجه جستجو یافت نشد</p>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.empty-product {
  @include flex(column, $align: center, $justify: center);
  gap: space(4);
  text-align: center;
  padding: space(10);

  &__image {
    width: 350px;
    height: 350px;
  }

  &__text{
    @include typography(heading-3);
    color: var(--palette-gray-10);
  }
}
</style>
