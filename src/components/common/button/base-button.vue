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
import { computed } from 'vue'
import BaseIcon from '@/components/common/icon/base-icon.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator(value) {
      return ['filled', 'outlined', 'text', 'underline'].includes(value);
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  leadingIcon: String,
  trailingIcon: String,
  leadingIconStyleType: String,
  trailingIconStyleType: String,
  disabled: {
    type: Boolean,
    default: false,
  },
})

const paddings = computed(() => ({
  leading: props.leadingIcon ? '16px' : '24px',
  trailing: props.trailingIcon ? '16px' : '24px',
}))

const buttonVariantClasses = computed(() => {
  return [
    'button',
    `button_${props.variant}`,
    { active: props.active } 
  ]
})
</script>

<style lang="scss" scoped>
.button {
  @include typography(button-2);
  border-radius: $radius-2x;
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
    color: var(--palette-gray-9);
  }

  padding-left: v-bind('paddings.trailing');
  padding-right: v-bind('paddings.leading');

  &__content {
    @include flex($align: center, $justify: center);
    gap: space(2);
  }

  &_filled {
    background-color: var(--base-button-color);
    color: var(--palette-white);
  }

  &_outlined {
    background-color: transparent;
    color: var(--base-button-color);
    border: 1px solid var(--base-button-color);
  }

  &_underline {
    @include typography(body-3);
    background-color: transparent;
    color: var(--palette-gray-10);
    border-radius: 0;

    &.active {
      color:var(--base-button-color); 
      border-bottom: 2px solid var(--base-button-color); 
    }
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
