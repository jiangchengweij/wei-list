<template>
  <!-- #ifdef APP-NVUE -->
  <refresh 
    @refresh="onRefresh"
    @pullingdown="onPullingdown"
    :display="show ? 'show' : 'hide'"
  >
  <!-- #endif -->
  <view class="wei-refresh" :style="{ height: getUnit(viewHeight) }"
  >
    <view class="wei-refresh-content">
      <!-- #ifdef APP-NVUE -->
      <loading-indicator 
        v-if="refreshing"
        class="wei-refresh-indicator" 
        :animating="true">
      </loading-indicator>
      <!-- #endif -->
      <image v-if="!refreshing" 
        class="wei-refresh-allow" 
        :class="loosing ? 'arrow-top' : 'arrow-bottom'"
        :src="allowDown">
      </image>
      <text>{{ refreshText }}</text>
    </view>
  </view>
  <!-- #ifdef APP-NVUE -->
  </refresh>
  <!-- #endif -->
</template>

<script setup>
  import { getUnit, allowDown } from '../wei-list/util.js';
  const emit = defineEmits(['refresh', 'pullingdown']);
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    refreshing: {
      type: Boolean,
      default: false
    },
    refreshText: {
      type: String,
      default: '',
    },
    pulling: {
      type: Boolean,
      default: false,
    },
    loosing: {
      type: Boolean,
      default: false
    },
    viewHeight: {
      type: [String, Number],
      default: 50,
    }
  });
  
  function onPullingdown(e) {
    emit('pullingdown', e);
  }
  
  function onRefresh(e) {
    emit('refresh', e);
  }
  
</script>

<style scoped>
  .wei-refresh {
    width: 750rpx;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
  }
  .wei-refresh-indicator {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
  .wei-refresh-content {
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .wei-refresh-allow {
    width: 25px;
    height: 25px;
    margin-right: 8px;
    line-height: 30px;
    transition: transform 0.2s linear;
  }
  .wei-refresh-allow.arrow-top {
    transform: rotate(-180deg);
  }
  .wei-refresh-allow.arrow-bottom {
    transform: rotate(0deg);
  }
</style>
