<template>
  <div v-if="productStore.loading" class="global-loader">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
  import { useProductStore } from '@/store/products';
  const productStore = useProductStore();
</script>

<style scoped>
.global-loader {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.7);
  z-index: 9999;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--palette-gray-4);
  border-top-color: var(--palette-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
