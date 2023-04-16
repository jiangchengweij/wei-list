<template>
  <!-- #ifdef APP-NVUE -->
  <cell :recycle="false">
  <!-- #endif -->
  <view 
    class="wei-loading"
  >
    <slot>
      <view class="wei-loading-content">
        <image ref="ani" :src="loadingIcon" class="wei-loading-indicator"></image>
<!--        <loading-indicator 
          v-if="loading"
          :animating="true" class="wei-loading-indicator"></loading-indicator> -->
        <text class="wei-loading-text">{{ loadingText }}</text>
      </view>
    </slot>
  </view>
  <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script setup>
  import { loadingIcon } from '../wei-list/util.js';
  import { ref, onMounted } from "vue";
  // #ifdef APP-NVUE
  const animation = weex.requireModule('animation');
  // #endif
  const emit = defineEmits(['loading'])
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '',
    }
  });
  const ani = ref(null);
  onMounted(() => {
    setTimeout(() => {
      startAnimate();
    }, 1000)
    
  })
  
  function onLoading(e) {
    emit('loading', e)
  }
  let aniAngel = 360;
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