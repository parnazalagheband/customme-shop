<template>
  <layout-view>
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" :mode="defaultTransitionMode" appear>
        <component :is="Component" :key="routeKey ?? route.path" />
      </transition>
    </router-view>
  </layout-view>
</template>

<script setup>
import LayoutView from "@/layouts/default.layout.vue";

defineProps({
  transitionName: { type: String, default: 'scale-fade' },
  routeKey: { type: String, default: '' },
  defaultTransitionMode: { type: String, default: 'out-in' },
})
</script>
