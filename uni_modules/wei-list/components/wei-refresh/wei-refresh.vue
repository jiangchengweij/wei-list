<template>
  <!-- #ifdef APP-NVUE -->
  <refresh 
    @refresh="onRefresh"
    @pullingdown="onPullingdown"
    :display="show ? 'show' : 'hide'"
  >
  <!-- #endif -->
  <view 
    class="wei-refresh"
    :style="{ height: getUnit(pullDistance) }"
  >
    <slot>
      <view class="wei-refresh-content">
        <text>{{ refreshText }}</text>
      </view>
    </slot>
  </view>
  <!-- #ifdef APP-NVUE -->
  </refresh>
  <!-- #endif -->
</template>

<script setup>
  import { getUnit } from '../wei-list/util.js';
  const emit = defineEmits(['refresh', 'pullingdown']);
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    refreshText: {
      type: String,
      default: '',
    },
    pullDistance: {
      type: [String, Number],
      default: 50,
    }
  });
  
  function onPullingdown(e) {
    emit('pullingdown', e)
  }
  
  function onRefresh(e) {
    emit('refresh', e);
  }
  
</script>

<style lang="scss">
  .wei-refresh {
    width: 750rpx;
    &-content {
      padding: 10px;
      flex: 1;
      flex-direction: row;
      align-items: flex-end;
      justify-content: center;
    }
  }
</style>
