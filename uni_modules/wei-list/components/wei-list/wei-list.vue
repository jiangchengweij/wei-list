<script>
  /**
   * 普通列表
   * @description 高性能长列表组件，对nvue list的扩展，兼容多端
   * @property {Boolean} showScrollbar 控制是否出现滚动条
   * @property {Boolean} refresherEnable 默认 false 是否启用下拉刷新，必须同pages配置enablePullDownRefresh相同
   * @property {Boolean} enableLoadmore 默认 false 是否启用上拉加载
   * @property {Object} loadingTextConfig 加载文案，实例{ loading: '正在加载...', finished: '没有更多了', error: '' }
   * @property {Boolean} bounce 默认 true 控制是否回弹效果, iOS 不支持动态修改
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
  <view class="wei-list-wrapper">
    <list
      class="wei-list"
      :show-scrollba="showScrollbar"
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
    <view class="wei-list" ref="listRef">
    <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <template #refresher>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      </template>
      <!-- #endif -->
      <slot></slot>

      <!-- #ifdef APP-NVUE -->
      <cell :recycle="false">
      <!-- #endif -->  
        <wei-loading v-if="enableLoadmore || refreshing" :loadingText="loadingText" :loading="isLoading" :finished="isFinished">
        </wei-loading>
      <!-- #ifdef APP-NVUE -->
      </cell>
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      <cell>
      <!-- #endif -->  
        <slot name="footer"></slot>
      <!-- #ifdef APP-NVUE -->
      </cell>
      <!-- #endif -->
      
    <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
    </list>
  </view>
  <!-- #endif -->

</template>
<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  import { computed, ref } from "vue";
  import { useProvideList } from './context.js';
  import basicProps from './props.js';
  import { useLoading } from "../wei-loading/useLoading.js";
  import { useRefresh } from './useRefresh.js';
  const emit = defineEmits(['loadmore', 'refresh']);
  const props = defineProps(basicProps);
  const { isLoading, loadingText, onLoadmore, isFinished, complete: completeLoading, end: endLoading } = useLoading(props, emit);
  const { onRefresh, complete: completeRefresh, refreshing } = useRefresh(props, emit);
  useProvideList({
    type: 'list',
  })
  
  const listRef = ref(null);

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
  .wei-list {
    /* #ifdef APP-NVUE */
    flex: 1;
    /* #endif */
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* #endif */
  }
</style>
