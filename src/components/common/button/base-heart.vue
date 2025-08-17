<template>
  <div class="heart-container" @click="toggleLike">
    <base-icon
      v-if="!props.modelValue"
      icon-name="heart"
      style-type="outlined"
      :stroke="'gray'"
      :fill="'transparent'"
      class="heart-icon"
    />
    <base-icon
      v-else
      icon-name="heart"
      style-type="filled"
      :stroke="'red'"
      :fill="'red'"
      class="heart-icon"
    />
  </div>
</template>

<script setup>
  import BaseIcon from '@/components/common/icon/base-icon.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const toggleLike = () => {
    emit('update:modelValue', !props.modelValue);
  };
</script>

<style scoped lang="scss">
  .heart-container {
    cursor: pointer;
    .heart {
      --base-icon-size: 1.5rem;
    }
  }
</style>
