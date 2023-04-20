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
  
    <slot name="header"></slot>
    
    <!-- #ifndef APP-NVUE -->
    <view class="wei-waterfall-list__bd" :style="listbdStyle">
    <!-- #endif -->
      <slot></slot>
    <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->
      
    <!-- #ifdef APP-NVUE -->
    <header>
    <!-- #endif -->  
      <!-- #ifndef APP-NVUE -->
      <view class="wei-waterfall-loading">
      <!-- #endif -->
      <wei-loading v-if="enableLoadmore || refreshing" :loadingText="loadingText" :loading="isLoading" :finished="isFinished">
      </wei-loading>
      <!-- #ifndef APP-NVUE -->
      </view>
      <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    </header>
    <!-- #endif -->

  <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
  
  <!-- #ifdef APP-NVUE -->
  <header>
  <!-- #endif -->  
    <slot name="footer"></slot>
  <!-- #ifdef APP-NVUE -->
  </header>
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
  const { onRefresh, refreshing } = useRefresh(props, emit);
  
  // #ifndef APP-NVUE
  // 计算元素的宽度传达给子元素用于布局
  const instance = getCurrentInstance();
  const waterfallWidth = ref(0);
  const listHeight = ref(1);
  const listTop = ref(0);

  onMounted(() => {
    setInit();
  })
  
  function setInit() {
    getClientRect('.wei-waterfall-list').then(res => {
      waterfallWidth.value = res.width;
    })
    getClientRect('.wei-waterfall-list__bd').then(res => {
      listTop.value = res.top;
    })
  }
  
  function getClientRect(cls) {
    return new Promise((resolve, reject) => {
      uni.createSelectorQuery().in(instance)
        .select(cls)
        .boundingClientRect((res) => {
          if(res) 
            resolve(res);
          else reject(res);
        }).exec();
    })
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
    const { leftGap, rightGap, columnGap, rowGap, columnCount, columnWidth, loadmoreoffset, autoFill } = props;
    const len = children.length;
    const count = getToNum(columnCount, 1) ;
    const tempColumnGap = getToNum(columnGap);
    const tempLeftGap = getToNum(leftGap);
    const tempRowGap = getToNum(rowGap);
    
    if(autoFill) { //启用智能填坑
      if(len >= count) {
        var ind = len - 1;
        var minTop = children[ind].top + children[ind].height;
        var minInd = ind;
        ind--;
        var num = 0;
        while(num < count && ind >= 0) {
          const prevItem = children[ind];
          if(!prevItem.fill) {
            num++;
            var tempTop = prevItem.height + prevItem.top
            if(minTop > tempTop) {
              minInd = ind;
              minTop = tempTop;
            }
          }
          ind--;
        }
        children[minInd].fill = true;
        const left = children[minInd].left;
        var top = minTop + tempRowGap;
        listHeight.value = Math.max(listHeight.value, top + rect.height);
        children.push({ top, left, height: rect.height, fill: false });
        callback({top, left});
      } else {
        var top = 0;
        listHeight.value = Math.max(listHeight.value, rect.height);
        const left = len % count
          * (waterfallItemWidth.value + tempColumnGap) + tempLeftGap;
        children.push({ top, left, height: rect.height, fill: false });
        callback({top, left});
      }
    } else {
      const left = len % count
        * (waterfallItemWidth.value + tempColumnGap) + tempLeftGap;
      let top = 0;
      if(len >= count) {
        const prevItem = children[len - count];
        top = prevItem.top + prevItem.height + tempRowGap;
      }
      listHeight.value = Math.max(listHeight.value, top + rect.height);
      children.push({ top, left, height: rect.height });
      callback({top, left});
    }
  }
  
  const listbdStyle = computed(() => {
    const { layout, columnCount, columnGap, leftGap, rightGap, rowGap } = props;
    const style = {};
    if(layout === 'grid') {
      style.display = 'grid';
      const tempColumns = Array.from({ length: getToNum(columnCount, 1) }).fill('1fr') 
      style.gridTemplateColumns = tempColumns.join(' ');
      style.gridColumnGap = columnGap + 'px';
      style.gridRowGap = rowGap + 'px';
      style.paddingLeft = leftGap + 'px';
      style.paddingRight = rightGap + 'px';
    } else {
      style.height = listHeight.value + 'px';
    }
    return style;
  })
  // #endif
  
  const loadingTop = ref(0);
  
  const loadingStyle = computed(() => {
    const { loadmoreoffset } = props;
    const style = {};
    // #ifndef APP-NVUE
    style.position = 'absolute';
    style.top = loadingTop.value + 'px';
    style.height = loadmoreoffset + 'px';
    // #endif
    return style;
  })

  function reload(e = {}) {
    onRefresh(e);
  }
  
  function loadMore(e = {}) {
    if(props.enableLoadmore) {
      onLoadmore(e);
    }
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
    layout: computed(() => props.layout),
    addChildren,
    // #endif
    rowGap: computed(() => getToNum(props.rowGap, 0))
  })
  
  defineExpose({
    reload,
    loadMore
  })
</script>

<style>
  .wei-waterfall-list {
    /* #ifndef APP-NVUE */
    flex: 1;
    /* #endif */
  }
  .wei-waterfall-list__bd {
    position: relative;
  }
</style>
