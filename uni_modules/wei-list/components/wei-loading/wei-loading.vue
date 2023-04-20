<template>
  <view 
    class="wei-loading"
  >
    <slot>
      <view class="wei-loading-content">
        <template v-if="!finished">
          <image :src="loadingIcon" class="wei-loading-indicator"></image>
        </template>
        <text class="wei-loading-text">{{ loadingText }}</text>
      </view>
    </slot>
  </view>

</template>
 
<script setup>
  import { loadingIcon } from '../wei-list/util.js';
  import { ref, onMounted } from "vue";

  const emit = defineEmits(['loading'])
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '',
    },
    finished: {
      type: Boolean,
      default: false,
    }
  });
  
  function onLoading(e) {
    emit('loading', e)
  }

</script>

<style>
  .wei-loading {
    width: 750rpx;
    display: flex;
    flex-direction: column;
  }
  .wei-loading-content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .wei-loading-indicator {
    width: 25px;
    height: 25px;
    /* #ifndef APP-NVUE */
    animation: loading-H5 1s 0s step-end infinite;
    /* #endif */
  }
  .wei-loading-text {
    margin-left: 4px;
  }
  
  /* #ifndef APP-NVUE */
  @keyframes loading-H5 {
    0% {
      transform: rotate(0deg);
    }
    8% {
      transform: rotate(30deg);
    }
    16% {
      transform: rotate(60deg);
    }
    24% {
      transform: rotate(90deg);
    }
    32% {
      transform: rotate(120deg);
    }
    40% {
      transform: rotate(150deg);
    }
    48% {
      transform: rotate(180deg);
    }
    56% {
      transform: rotate(210deg);
    }
    64% {
      transform: rotate(240deg);
    }
    73% {
      transform: rotate(270deg);
    }
    82% {
      transform: rotate(300deg);
    }
    91% {
      transform: rotate(330deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /* #endif */
</style>
