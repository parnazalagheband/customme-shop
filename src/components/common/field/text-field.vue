<template>
  <div :class="textFieldClasses">
    <div class="text-field__main">
      <base-icon
        v-if="leadingIcon"
        class="text-field__leading-icon"
        transition-mode="out-in"
        :icon-name="leadingIcon"
        :style-type="leadingIconStyleType"
      />
      <div class="text-field__field" @click="setFocus(true)">
        <p v-if="label" class="text-field__lbl">{{ label }}</p>
        <input
          ref="inputElement"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
          type="text"
          class="text-field__input"
          v-model="value"
          :disabled="disabled"
        />
      </div>
      <base-icon
        v-if="trailingIcon"
        class="text-field__trailing-icon"
        transition-mode="out-in"
        :icon-name="trailingIcon"
        :style-type="trailingIconStyleType"
      />
    </div>
    <p v-show="supportingText" class="text-field__supporting-text">
      {{ supportingText }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import BaseIcon from '@/components/common/icon/base-icon.vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  leadingIcon: String,
  trailingIcon: String,
  leadingIconStyleType: String,
  trailingIconStyleType: String,
  supportingText: String,
  disabled: { type: Boolean, default: false },
  label: String,
});

const inputElement = ref();
const hasFocus = ref(false);
const emit = defineEmits(['update:modelValue']);
const value = ref(props.modelValue);

watch(value, (val) => {
  emit('update:modelValue', val);
});

const setFocus = (focus) => {
  if (focus === hasFocus.value) return;
  if (focus) inputElement.value.focus();
  hasFocus.value = focus;
};

const textFieldClasses = computed(() => ({
  'text-field': true,
  'text-field_focused': hasFocus.value,
  'text-field_disabled': props.disabled,
  'text-field_has-value': value.value !== '',
}));

const paddings = computed(() => ({
  leading: props.leadingIcon ? '12px' : '16px',
  trailing: props.trailingIcon ? '12px' : '16px',
}));
</script>

<style lang="scss" scoped>
.text-field {
  &__main {
    @include flex($align: center);
    position: relative;
    gap: space(4);
    padding: space(2);
    border: 1px solid var(--palette-gray-4);
    height: 60px;
    border-radius: $radius-4x;
    padding-left: v-bind('paddings.leading');
    padding-right: v-bind('paddings.trailing');
    transition: background-color 0.2s;
  }

  &__leading-icon,
  &__trailing-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: var(--palette-primary);
    transition: color 0.2s;
  }

  &__field {
    flex-grow: 1;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__lbl {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--palette-gray-8);
    font-size: 1rem;
    line-height: 1.5rem;
    transition: top 0.2s, transform 0.2s, color 0.2s;
  }

  &__input {
    width: 100%;
    flex-grow: 1;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &__supporting-text {
    font-size: 0.875rem;
    color: var(--palette-gray-8);
    padding: 4px 16px 0;
    transition: color 0.2s;
  }

  &.text-field_focused .text-field__lbl,
  &.text-field_has-value .text-field__lbl {
    top: 10%;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &.text-field_disabled {
    pointer-events: none;
    opacity: 0.38;

    .text-field__leading-icon,
    .text-field__trailing-icon,
    .text-field__supporting-text,
    .text-field__input,
    .text-field__lbl {
      color: var(--palette-gray-4);
    }
  }
}
</style>
