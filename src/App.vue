<template>
  <global-loader/>
  <transition-router :route-key="routeKey" :defaultTransitionMode="'out-in'" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TransitionRouter from './components/common/router/transition.component.vue';
import GlobalLoader from "@/components/common/router/global-loader.vue";

const route = useRoute()

const routeKey = computed(() => {
  if (!route.matched.length) return ''
  return route.matched[0].name
})
</script>
