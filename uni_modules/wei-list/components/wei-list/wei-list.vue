<template>
  <!-- #ifdef APP-NVUE -->
  <view class="wei-list-wrapper">
    <list
      class="wei-list"
      :show-scrollba="showScrollbar"
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
    <view class="wei-list">
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
        <wei-loading :loadingText="loadingText" :loading="isLoading" :finished="isFinished">
        </wei-loading>
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
  import { computed } from "vue";
  import { useProvideList } from './context.js';
  import basicProps from './props.js';
  import { useLoading } from "../wei-loading/useLoading.js";
  import { useRefresh } from './useRefresh.js';
  const emit = defineEmits(['loading', 'refresh']);
  const props = defineProps(basicProps);
  const { isLoading, loadingText, onLoadmore, isFinished } = useLoading(props, emit);
  const { onRefresh } = useRefresh(props, emit);
  useProvideList({
    type: 'list',
  })

  // #ifndef APP-NVUE
  onReachBottom((e) => {
    onLoadmore(e);
  })
  // #endif
  onPullDownRefresh(e => {
    onRefresh(e)
  })
</script>
<style>
  .wei-list {
    /* #ifdef APP-NVUE */
    flex: 1;
    /* #endif */
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* #endif */
  }
</style>
