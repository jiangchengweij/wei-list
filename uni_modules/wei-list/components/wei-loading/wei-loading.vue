<template>
  <!-- #ifdef APP-NVUE -->
  <loading 
    v-if="show"
  >
  <!-- #endif -->
  <view 
    class="wei-loading"
  >
    <slot>
      <view class="wei-loading-content">
        <text>{{ loadingText }}</text>
      </view>
    </slot>
  </view>
  <!-- #ifdef APP-NVUE -->
  </loading>
  <!-- #endif -->
</template>

<script setup>
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '',
    }
  });
</script>

<style lang="scss">
  .wei-loading {
    width: 750rpx;
    height: 30px;
  }
</style>