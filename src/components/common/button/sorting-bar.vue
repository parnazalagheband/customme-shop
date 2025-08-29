<template>
  <div class="filter-bar">
    <base-button
      v-for="option in options"
      :key="option.value"
      class="filter-bar__btn"
      @click="selectFilter(option.value)"
      :active="props.modelValue === option.value"
      variant="underline"
    >
      {{ option.label }}
    </base-button>
  </div>
</template>

<script setup>
  import BaseButton from '@/components/common/button/base-button.vue';

 const emit = defineEmits(['update:modelValue']);

  const props = defineProps({
    modelValue: { type: String, default: 'all' },
  });
  const options = [
    { label: 'همه', value: 'all' },
    { label: 'گران‌ترین', value: 'most_expensive' },
    { label: 'ارزان‌ترین', value: 'cheapest' },
    { label: 'جدیدترین', value: 'newest' },
  ];

  const selectFilter = (value) => {
    emit('update:modelValue', value);
  };
</script>

<style scoped lang="scss">
  .filter-bar {
    @include flex($align: center);

    &__btn {
      --base-button-color: var(--palette-primary);
    }
  }
</style>
