<template>
  <button :class="buttonVariantClasses" :disabled="disabled">
    <div class="button__content">
      <base-icon
        class="button__leading-icon"
        v-if="leadingIcon"
        :icon-name="leadingIcon"
        :style-type="leadingIconStyleType"
        transition-mode="out-in"
      />
      <slot />
      <base-icon
        class="button__trailing-icon"
        v-if="trailingIcon"
        :icon-name="trailingIcon"
        :style-type="trailingIconStyleType"
        transition-mode="out-in"
      />
    </div>
  </button>
</template>

<script setup>
  import { computed } from 'vue';
  import BaseIcon from '@/components/common/icon/base-icon.vue';

  const props = defineProps({
    variant: {
      type: String,
      default: 'text',
      validator(value) {
        return ['filled', 'outlined', 'text'].includes(value);
      },
    },
    leadingIcon: String,
    trailingIcon: String,
    leadingIconStyleType: {
      type: String,
    },
    trailingIconStyleType: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const paddings = computed(() => ({
    leading: props.leadingIcon ? '16px' : '24px',
    trailing: props.trailingIcon ? '16px' : '24px',
  }));

  const buttonVariantClasses = computed(() => {
    return ['button', `button_${props.variant}`];
  });


</script>

<style lang="scss" scoped>
  .button {
    @include typography(button-2);
    position: relative;
    border-radius: $pill;
    height: 40px;
    --base-icon-size: 1.125rem;
    color: var(--base-button-color);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    min-width: var(--base-button-min-width, 88px);

    &__leading-icon,
    &__trailing-icon {
      flex-shrink: 0;
      --base-icon-size: 1.5rem;
      color:var(--palette-gray-9);

    }

    padding-left: v-bind('paddings.trailing');
    padding-right: v-bind('paddings.leading');

    &__content {
      position: relative;
      z-index: 1;
      @include flex($align: center, $justify: center);
      gap: space(2);
    }

    &_filled {
      background-color: var(--palette-primary);
      color:var(--palette-white);
    }

    &_outlined {
      background-color: transparent;
      color:var(--palette-primary);
      border:1px solid var(--palette-primary);
    }

    &_text {
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.38;
      pointer-events: none;
    }
  }
</style>
