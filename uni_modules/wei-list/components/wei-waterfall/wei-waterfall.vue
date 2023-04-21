<script>
  /**
   * 瀑布流
   * @description 高性能瀑布流组件，对nvue waterfall的扩展，兼容多端
   * @property {String} layout=[grid|absolute] 瀑布流布局方式
   * @property {Boolean} autoFill 默认 false 是否启用智能填坑模式
   * @property {Number} columnCount 每行列数
   * @property {Number} columnWidth 每行宽度，不指定会自动计算
   * @property {Number} columnGap 每列间隔
   * @property {Number} rowGap 每行间隔
   * @property {Number} leftGap 左边cell和列表的间隙. 如果未指定 ，则对应 0
   * @property {Number} rightGap 右边cell和列表的间隙. 如果未指定，则对应 0
   * @property {Number} delay 延时渲染子cell，在layout=absolute时启用
   * @property {Boolean} showScrollbar 控制是否出现滚动条
   * @property {Boolean} refresherEnable 默认 false 是否启用下拉刷新，必须同pages配置enablePullDownRefresh相同
   * @property {Boolean} enableLoadmore 默认 false 是否启用上拉加载
   * @property {Object} loadingTextConfig 加载文案，实例{ loading: '正在加载...', finished: '没有更多了', error: '' }
   * @property {Boolen} bounce 默认 true 控制是否回弹效果, iOS 不支持动态修改
   * @property {Number} loadmoreoffset 默认 0 触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与 list 底部之间的距离），建议手动设置此值，设置大于0的值即可
   * @property {Number} offsetAccuracy 默认 10 控制 onscroll 事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能
   * @property {Boolean} scrollable 默认 true 是否允许List滚动
   * @property {Boolean} enableBackToTop 默认 false iOS点击顶部状态栏滚动条返回顶部，只支持竖向
   * @property {Boolean} renderReverse 默认 false 定义是否从底部渲染，需搭配cell的属性render-reverse-position共同使用，单独配置会导致渲染异常。
   * @event {Function} reload 重新加载数据，也是初始化数据
   * @event {Function} loadmore 加载更多事件
   * @function {Function} reload 触发重新加载
   * @function {Function} loadMore 触发加载更多事件
   * @function {Function} completeLoading 触发加载完成
   * @function {Function} endLoading 触发加载结束
   * @function {Function} completeRefresh 触发刷新结束
   */
  export default {}
</script>
<template>
  <!-- #ifdef APP-NVUE -->
  <waterfall
    :show-scrollbar="showScrollbar"
    :column-count="columnCount"
    :column-width="columnWidth"
    :column-gap="columnGap"
    :left-gap="leftGap"
    :right-gap="rightGap"
    :always-scrollable-vertical="alwaysScrollableVertical"
    :bounce="bounce"
    :loadmoreoffset="loadmoreoffset"
    :offsetAccuracy="offsetAccuracy"
    :pageEnabled="pageEnabled"
    :scrollable="scrollable"
    :enableBackToTop="enableBackToTop"
    :renderReverse="renderReverse"
    @loadmore="onLoadmore"
    ref="listRef"
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <view class="wei-waterfall-list" ref="listRef">
  <!-- #endif -->
  
    <!-- #ifdef MP-WEIXIN -->
    <template #refresher>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    </template>
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

  const emit = defineEmits(['loadmore', 'refresh']);
  const props = defineProps(basicProps);
  const { isLoading, loadingText, onLoadmore, isFinished, complete: completeLoading, end: endLoading } = useLoading(props, emit);
  const { onRefresh, complete: completeRefresh, refreshing } = useRefresh(props, emit);
  const listRef = ref(null);
  // #ifndef APP-NVUE
  // 计算元素的宽度传达给子元素用于布局
  const instance = getCurrentInstance();
  const waterfallWidth = ref(0);
  const listHeight = ref(1);

  onMounted(() => {
    setInit();
  })
  
  function setInit() {
    getClientRect('.wei-waterfall-list').then(res => {
      waterfallWidth.value = res.width;
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
  
  function getListRef() {
    return listRef.value;
  }

  useProvideList({
    type: 'waterfall',
    // #ifndef APP-NVUE
    columnCount: computed(() => getToNum(props.columnCount, 1)),
    columnWidth: computed(() => getToNum(props.columnWidth, 0)),
    columnGap: computed(() => getToNum(props.columnGap, 0)),
    leftGap: computed(() => getToNum(props.leftGap, 0)),
    rightGap: computed(() => getToNum(props.rightGap, 0)),
    delay: computed(() => props.delay),
    waterfallItemWidth: waterfallItemWidth,
    layout: computed(() => props.layout),
    addChildren,
    // #endif
    rowGap: computed(() => getToNum(props.rowGap, 0))
  })
  
  defineExpose({
    reload,
    loadMore,
    completeLoading,
    endLoading,
    completeRefresh,
    getListRef
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
