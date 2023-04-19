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
  <view class="wei-waterfall-list" :style="{ height: listHeight + 'px' }">
  <!-- #endif -->
    <slot name="header"></slot>
    
    <!-- #ifndef APP-NVUE -->
    <view class="wei-waterfall-list__bd">
    <!-- #endif -->
      <slot></slot>
      
      <!-- #ifdef APP-NVUE -->
      <header>
      <!-- #endif -->  
        <wei-loading :style="loadingStyle" :loadingText="loadingText" :loading="isLoading" :finished="isFinished">
        </wei-loading>
      <!-- #ifdef APP-NVUE -->
      </header>
      <!-- #endif -->

    <!-- #ifndef APP-NVUE -->
    </view>
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
  const listHeight = ref(1);
  
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
  
  const children = [];
  
  let tempWatiItem = [];
  
  function addChildren(rect, callback) {
    const { leftGap, rightGap, columnGap, columnCount, columnWidth } = props;
    const len = children.length;
    const count = getToNum(columnCount, 1) ;
    const tempColumnGap = getToNum(columnGap);
    const tempLeftGap = getToNum(leftGap);
    const left = len % count
      * (waterfallItemWidth.value + getToNum(columnGap)) + getToNum(leftGap);
    let top = 0;
    if(len >= count) {
      const prevItem = children[len - count];
      top = prevItem.top + prevItem.height + 10;
    }
    loadingTop.value = Math.max(loadingTop.value, top + rect.height);
    listHeight.value = 90 + top + 30;
    children.push({ top, left, height: rect.height })
    callback({top, left});
    
    //todo 暂时不可用 根据元素自身高度获得最佳插入位置
    // tempWatiItem.push({ rect, callback });
    // if(tempWatiItem.length >= count) {
    //   if(len >= count) {
    //     const prevs = children.slice(len - count, len);
    //     tempWatiItem.sort((a, b) => a.height < b.height);
    //     prevs.sort((a, b) => a.height + a.top < b.height + b.top);
    //     tempWatiItem.forEach((item, index) => {
    //       const left = index % count * (waterfallItemWidth.value + tempColumnGap) + tempLeftGap;
    //       const prevItem = prevs[index];
    //       var top = prevItem.top + prevItem.height + 10;
    //       children.push({ top, left, height: item.rect.height });
    //       item.callback({ top, left });
    //     })
    //     tempWatiItem = [];
    //   } else {
    //     tempWatiItem.forEach((item, index) => {
    //       const left = index % count * (waterfallItemWidth.value + tempColumnGap) + tempLeftGap;
    //       const top = 0;
    //       children.push({ top, left, height: item.rect.height });
    //       item.callback({ top, left });
    //     });
    //     tempWatiItem = [];
    //   }
    // }
  }
  // #endif
  
  const loadingTop = ref(0);
  
  const loadingStyle = computed(() => {
    const style = {};
    // #ifndef APP-NVUE
    style.position = 'absolute';
    style.top = loadingTop.value + 'px';
    // #endif
    return style;
  })

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
    columnWidth: computed(() => getToNum(props.columnWidth, 0)),
    columnGap: computed(() => getToNum(props.columnGap, 0)),
    leftGap: computed(() => getToNum(props.leftGap, 0)),
    rightGap: computed(() => getToNum(props.rightGap, 0)),
    waterfallItemWidth: waterfallItemWidth,
    addChildren,
    // #endif
  })
  
  defineExpose({
    reload,
    loadMore
  })
</script>

<style>
  .wei-waterfall-list {
    /* #ifndef APP-NVUE */
/*    display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    /* #endif */
  }
  .wei-waterfall-list__bd {
    position: relative;
  }
</style>
