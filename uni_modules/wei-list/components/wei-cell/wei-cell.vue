<template>
  <!-- #ifdef APP-NVUE -->
  <cell
    :keepScollPosition="keepScollPosition"
    :insetAnimation="insetAnimation"
    :recycle="recycle"
    :renderReversePosition="renderReversePosition"
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <view class="wei-cell">
  <!-- #endif -->
    <slot></slot>
  <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script setup>
  const props = defineProps({
    keepScollPosition: {
      type: Boolean,
      default: false,
    },
    insetAnimation: {
      type: String,
      default: 'none',
    },
    recycle: {
      type: Boolean,
      default: true
    },
    renderReversePosition: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss">
  
</style>