<template>
  <!-- #ifdef APP-NVUE -->
  <loading 
    :display="loading ? 'show' : 'hide'"
  >
  <!-- #endif -->
 <view 
    class="wei-loading"
  >
    <slot>
      <view class="wei-loading-content">
        <loading-indicator @loading="onLoading" class="wei-loading-indicator" :animating="true"></loading-indicator>
        <text class="wei-loading-text">{{ loadingText }}</text>
      </view>
    </slot>
  </view>
  <!-- #ifdef APP-NVUE -->
  </loading>
  <!-- #endif -->
</template>

<script setup>
  const emit = defineEmits(['loading'])
  const props = defineProps({
    loading: {
      type: true,
      default: true
    },
    loadingText: {
      type: String,
      default: '',
    }
  });
  
  function onLoading(e) {
    emit('loading', e)
  }
</script>

<style lang="scss">
  .wei-loading {
    width: 750rpx;
    &-content {
      padding: 10px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &-indicator {
      width: 25px;
      height: 25px;
    }
    &-text {
      margin-left: 4px;
    }
  }
</style>