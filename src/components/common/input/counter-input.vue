<template>
  <div class="counter">
    <div
      class="counter__plus-icon-wrapper"
      :class="{ counter__icon_disabled: isMax }"
      @click="increase"
    >
      <icon-button
        class="counter__icon"
        styleType="filled"
        variant="text"
        iconName="plus"
        :disabled="isMax"
      />
    </div>

    <div class="counter__number">
      {{ modelValue }}
    </div>

    <div
      class="counter__minus-icon-wrapper"
      :class="{ counter__icon_disabled: isMin }"
      @click="decrease"
    >
      <icon-button
        class="counter__icon"
        styleType="filled"
        variant="text"
        iconName="minus"
        :disabled="isMin"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconButton from '@/components/common/button/icon-button.vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 10 },
})

const emit = defineEmits(['update:modelValue'])

const isMin = computed(() => props.modelValue <= props.min)
const isMax = computed(() => props.modelValue >= props.max)

const increase = () => {
  if (!isMax.value) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const decrease = () => {
  if (!isMin.value) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>

<style scoped lang="scss">
  .counter {
    @include flex($align: center);
    border: 1px solid var(--palette-gray-4);
    border-radius: $radius-2x;
    width: 96px;
    height: 32px;
    overflow: hidden;

    &__number {
      @include typography(caption-1);
      flex: 1;
      height: 100%;
      text-align: center;
      border: none;
      outline: none;
      background: transparent;
    }

    &__icon {
      --base-icon-button-size: 8px;
      &_disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }

    &__plus-icon-wrapper,
    &__minus-icon-wrapper {
      @include flex($justify: center, $align: center);
      width: 32px;
      height: 100%;
      cursor: pointer;
    }

    &__plus-icon-wrapper {
      border-left: 1px solid var(--palette-gray-4);
    }

    &__minus-icon-wrapper {
      border-right: 1px solid var(--palette-gray-4);
    }
  }
</style>
