<template>
  <!-- #ifdef APP-NVUE -->
  <waterfall
    :show-scrollba="showScrollbar"
    :column-count="columnCount"
    :column-width="columnWidth"
    :column-gap="columnGap"
    :left-gap="leftGap"
    :right-gap="rightGap"
    :always-scrollable-vertical="alwaysScrollableVertical"
    :bounce="false"
    :loadmoreoffset="50"
    :offsetAccuracy="offsetAccuracy"
    :pageEnabled="pageEnabled"
    :scrollable="scrollable"
    :enableBackToTop="enableBackToTop"
    :renderReverse="renderReverse"
    @loadmore="onLoadmore"
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <view class="wei-waterfall-list">
  <!-- #endif -->
  
    <!-- #ifndef APP-NVUE -->
    <view class="wei-waterfall-list-content" :style="{
      paddingLeft: getToNum(leftGap) + 'px',
      paddingRight: getToNum(rightGap) + 'px',
    }">
    <!-- #endif -->
      <slot></slot>
    <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->

    <!-- #ifdef APP-NVUE -->
    <header>
    <!-- #endif -->  
      <wei-loading :loadingText="loadingText" :loading="isLoading" :finished="isFinished">
      </wei-loading>
    <!-- #ifdef APP-NVUE -->
    </header>
    <!-- #endif -->

  <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
  
  <!-- #ifdef APP-NVUE -->
  </waterfall>
  <!-- #endif -->
</template>

<script setup>
  import { computed, onMounted, getCurrentInstance, ref } from "vue";
  import { useProvideList } from '../wei-list/context.js';
  import basicProps from './props.js';
  import { useLoading } from "../wei-loading/useLoading.js";
  import { useRefresh } from '../wei-list/useRefresh.js';
  import { getToNum } from '../wei-list/util.js';

  const emit = defineEmits(['loading', 'refresh']);
  const props = defineProps(basicProps);
  const { isLoading, loadingText, onLoadmore, isFinished } = useLoading(props, emit);
  const { onRefresh } = useRefresh(props, emit);
  
  // #ifndef APP-NVUE
  // 计算元素的宽度传达给子元素用于布局
  const instance = getCurrentInstance();
  const waterfallWidth = ref(0);
  
  onMounted(() => {
    setWaterfallWidth();
  })
  
  function setWaterfallWidth() {
    uni.createSelectorQuery().in(instance)
      .select('.wei-waterfall-list')
      .boundingClientRect((res) => {
        if(res) 
          waterfallWidth.value = res.width;
      }).exec();
  }
  
  const waterfallItemWidth = computed(() => {
    const { leftGap, rightGap, columnGap, columnCount, columnWidth } = props;
    if(getToNum(columnWidth) > 0) {
      return columnWidth;
    }
    if(waterfallWidth.value > 0) {
      const count = getToNum(columnCount, 1)
      const tempWidth = (waterfallWidth.value 
        - getToNum(leftGap) -  getToNum(rightGap)
        - getToNum(columnGap) * (count - 1)) / count;
      return tempWidth;
    }
    return 0;
  })
  // #endif

  function reload(e = {}) {
    onRefresh(e);
  }
  
  function loadMore(e = {}) {
    onLoadmore(e);
  }

  useProvideList({
    type: 'watefall',
    // #ifndef APP-NVUE
    columnCount: computed(() => getToNum(props.columnCount, 1)),
    columnWidth: computed(() => props.columnWidth),
    columnGap: computed(() => getToNum(props.columnGap, 0)),
    leftGap: computed(() => props.leftGap),
    rightGap: computed(() => props.rightGap),
    waterfallItemWidth: waterfallItemWidth,
    // #endif
  })
  
  defineExpose({
    reload,
    loadMore
  })
</script>

<style>
  .wei-waterfall-list-content {
    /* #ifndef APP-NVUE */
    position: relative;
/*    display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    /* #endif */
  }
</style>
