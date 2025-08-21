<template>
  <div class="pagination">
    <icon-button
      class="pagination__icon-btn"
      styleType="filled"
      iconName="back"
      :disabled="modelValue === 1"
      @click="updatePage(modelValue - 1)"
    />

    <div class="pagination__pages pages">
      <button
        class="pages__btn"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: modelValue === page }"
        @click="updatePage(page)"
      >
        {{ page }}
      </button>
    </div>

    <icon-button
      class="pagination__icon-btn"
      styleType="filled"
      iconName="next"
      :disabled="modelValue === totalPages"
      @click="updatePage(modelValue + 1)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import IconButton from '@/components/common/button/icon-button.vue';

const props = defineProps({
  totalPages: { type: Number, required: true },
  modelValue: { type: Number, required: true }, 
});

const emit = defineEmits(['update:modelValue']);

const updatePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:modelValue', page);
    emit('changePage',page)
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  @include flex($align: center, $justify: center);
  gap: space(2);

  &__icon-btn {
    --base-icon-button-color: var(--palette-primary);
  }
}

.pages {
  @include flex($align: center);
  gap: space(9);
  padding: 0 space(9);
  border: 1px solid var(--palette-gray-4);
  border-radius: $radius-6x;
  height: 56px;

  &__btn {
    border: 1px solid var(--palette-gray-8);
    width: 32px;
    height: 32px;
    border-radius: $circle;
  }

  .pages__btn.active {
    background-color: var(--palette-tint-6);
    border-color: var(--palette-tint-6);
  }
}
</style>
