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
  <view class="wei-cell" :style="cellStyle">
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
  import { computed, onMounted, getCurrentInstance } from "vue";
  import { useInjectForm } from '../wei-list/context.js';
  import { getToNum } from '../wei-list/util.js';

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
    },
    index: {
      type: Number,
      default: null,
    }
  })
  
  const instance = getCurrentInstance();
  
  onMounted(() => {
    setTimeout(() => {
      uni.createSelectorQuery().in(instance)
        .select('.wei-cell')
        .boundingClientRect((res) => {
          console.log(res)
        }).exec();
    }, 100)
  })
  
  // #ifndef APP-NVUE
  const { columnCount, type: listType, waterfallItemWidth, columnGap } = useInjectForm();
  const cellStyle = computed(() => {
    const { index } = props;
    const style = {};
    style.top = 300 * index + 'px';
    style.left = 0;
    // if(listType === 'watefall' && waterfallItemWidth.value > 0) {
    //   style.width = waterfallItemWidth.value + 'px';
    // }
    // if(index !== null && columnCount.value > 0) {
    //   if((index + 1) % columnCount.value > 0) {
    //     style.marginRight = columnGap.value + 'px';
    //   }
    // }
    return style;
  })
  // #endif
</script>

<style lang="scss">
  /* #ifndef APP-NVUE */
  .wei-cell {
    position: absolute;
  }
  /* #endif */
</style>
