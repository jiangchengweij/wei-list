<template>
  <!-- #ifdef APP-NVUE -->
  <header>
  <!-- #endif -->
  <view class="wei-header"
  >
    <slot></slot>
  </view>
  <!-- #ifdef APP-NVUE -->
  </header>
  <!-- #endif -->
</template>

<script setup>
  const props = defineProps({
    sticky: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0,
    }
  })
</script>

<style>
  .wei-header {
    position: sticky;
    z-index: 999;
  }
</style>

