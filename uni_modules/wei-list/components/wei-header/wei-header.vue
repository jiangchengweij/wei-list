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

<script>
</script>

<style>
  .wei-header {
    position: sticky;
    z-index: 999;
    top: 44px;
  }
</style>

