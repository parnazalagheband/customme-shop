<template>
  <component class="base-icon" :is="icon" />
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  styleType: {
    type: String,
    default: 'filled',
    validator(type) {
      return ['filled', 'outlined'].includes(type);
    },
  },
});

const getFallbackIconType = () =>
  props.styleType === 'filled' ? 'outlined' : 'filled';

const icon = computed(() => {
  const iconName = props.iconName;
  const type = props.styleType;

  return defineAsyncComponent({
    loader: async () => {
      try {
        return await import(`../../../assets/icons/${type}/${iconName}.icon.vue`);
      } catch (error) {
        const fallbackType = getFallbackIconType();
        console.warn(`Fallback icon used: ${iconName} -> [${fallbackType}]`);
        return await import(`../../../assets/icons/${fallbackType}/${iconName}.icon.vue`);
      }
    },
  });
});
</script>

<style scoped>
.base-icon {
  width: var(--base-icon-size, 1.5rem);
  height: var(--base-icon-size, 1.5rem);
}
</style>
