<template>
  <div>
    <text-field
      class="text-field"
      v-model="searchValue"
      trailing-icon="search"
      trailing-icon-style-type="outlined"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import TextField from '@/components/common/field/text-field.vue';
  const searchValue = ref('');
</script>

<style scoped lang="scss">
  .text-field {
    --base-height: 48px;
    --base-radius: 16px;
  }
</style>
