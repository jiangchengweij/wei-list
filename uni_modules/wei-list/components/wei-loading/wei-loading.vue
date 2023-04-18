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
