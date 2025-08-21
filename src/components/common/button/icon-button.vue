<template>
  <button :class="iconButtonClasses">
    <base-icon
      class="icon-button__icon"
      :icon-name="iconName"
      :style-type="styleType"
    />
  </button>
</template>

<script setup>
  import { computed } from 'vue';
  import BaseIcon from '@/components/common/icon/base-icon.vue'

  const props = defineProps({
    iconName: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'outlined',
      validator(value) {
        const variants = ['filled', 'outlined'];
        return variants.includes(value);
      },
    },
    styleType: {
      type: String,
      default: 'filled',
      validator(value) {
        const styleTypes = ['filled', 'outlined','text'];
        return styleTypes.includes(value);
      },
    },
  });


  const iconButtonClasses = computed(() => {
    const classList = ['icon-button', `icon-button_${props.variant}`];
    return classList;
  });
</script>

<style lang="scss" scoped>
  .icon-button {
    @include flex($justify: center, $align: center);
    width: 24px;
    height: 24px;
    border-radius: $circle;
    padding:space(1);
    cursor: pointer;

    &_filled {
      background-color: var(--base-icon-button-color);
      color: var(--palette-white);
    }

    &_text{
      color: var(--base-icon-button-color);
    }

    &_outlined {
      color: var(--base-icon-button-color);
      border: 1px solid var(--base-icon-button-color);
    }

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    &__icon {
      --base-icon-size: 1.5rem;
    }
  }
</style>
