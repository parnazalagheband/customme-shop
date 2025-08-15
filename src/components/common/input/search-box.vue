<template>
  <div>
    <text-field
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
