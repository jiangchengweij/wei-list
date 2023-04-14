<template>
  <!-- #ifdef APP-NVUE -->
  <refresh>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <view class="wei-refresh">
  <!-- #endif -->
    <slot>
      <text>下拉刷新</text>
    </slot>
  <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  </refresh>
  <!-- #endif -->
</template>

<script setup>
  defineProps({
    
  })
</script>

<style>
</style>