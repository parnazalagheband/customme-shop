<template>
  <div :class="switchClasses" @click="toggleSwitch">
    <div class="switch__driver"></div>
    <div class="switch__handle">
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const modelValue = defineModel({ type: Boolean, default: false });

  const toggleSwitch = () => {
    modelValue.value = !modelValue.value;
  };

  const switchClasses = computed(() => ({
    switch: true,
    switch_selected: modelValue.value,
    switch_disabled: props.disabled,
  }));

</script>

<style scoped lang="scss">
.switch {
  position: relative;
  height: 20px;
  width: 40px;
  padding:space(1);
  border: 1px solid var(--palette-gray-4);
  border-radius: $radius-4x;
  cursor: pointer;
  background-color: transparent;

  &__driver {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: transparent;
  }

  &__handle {
    position: absolute;
    top: 50%;     
    left: 2px;    
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
    border-radius: $circle;
    background-color: var(--palette-gray-7); 
    transition: transform 0.3s ease, background-color 0.3s ease;
  }


  &_selected {
    .switch__driver {
      background-color: var(--palette-gray-3);
    }
    .switch__handle {
      background-color: var(--palette-primary); 
      transform: translateX(20px) translateY(-50%);
    }
  }

  &_disabled {
    pointer-events: none;
    opacity: 0.5;

    .switch__handle {
      background-color: var(--palette-gray-4);
      box-shadow: none;
    }
  }
}



</style>





