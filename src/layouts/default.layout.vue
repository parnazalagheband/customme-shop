<template>
  <div>
    <default-header/>
    <slot />
  </div>
</template>
<script setup>
import defaultHeader from "@/components/layout/default/default-header.vue"
</script>