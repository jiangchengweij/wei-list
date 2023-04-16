<template>
  <!-- #ifdef APP-NVUE -->
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
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    class="wei-list wei-scroll-view"
    :scroll-y="true"
    :refresher-enabled="true"
    :refresher-threshold="50"
    refresher-default-style="none"
    :refresher-triggered="refreshShow"
    @refresherrefresh="onRefresh"
    :change:prop="refreshWx.propObserver" :prop="refreshHeight"
    @refresherpulling="refreshWx.onPulling"
  >
  <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <template #refresher>
    <!-- #endif -->
      <wei-refresh v-if="refresherEnable" 
        @refresh="onRefresh" 
        @pullingdown="onPullingdown" 
        :refreshing="refreshing"
        :refreshText="refreshText"
        :pulling="pulling"
        :loosing="loosing"
        :viewHeight="headHeight"
        :show="refreshShow">
        <slot name="refresh"></slot>
      </wei-refresh>
    <!-- #ifdef MP-WEIXIN -->
    </template>
    <!-- #endif -->
    <slot></slot>
    <wei-loading :loadingText="loadingText" :loading="isLoading"></wei-loading>
  <!-- #ifndef APP-NVUE -->
  </scroll-view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  </list>
  <!-- #endif -->
</template>
<!-- #ifdef MP-WEIXIN -->
<script src="./refresh.wxs" module="refreshWx" lang="wxs"></script>
<!-- #endif -->
<script setup>
  import { computed } from "vue";
  import { useProvideList } from './context.js';
  import basicProps from './props.js';
  import { useLoading } from "./useLoading.js";
  import { useRefresh } from "./useRefresh.js";
  const emit = defineEmits(['loading', 'refresh']);
  const props = defineProps(basicProps);
  const { onRefresh, onPullingdown, refreshText,
    refreshShow, refreshing, pulling, loosing, refreshHeight } = useRefresh(props, emit);
  const { isLoading, loadingText, onLoadmore, isFinished } = useLoading(props, emit);
  useProvideList({
    type: 'list',
  })
  const showLoading = computed(() => {
    return !isFinished.value;
  })
  
  function onRefresherpulling(e) {
    console.log(e)
  }
  
  function _handleTest() {
    console.log('被调用');
  }
  
  defineExpose({
    _handleTest
  })
</script>
<style>
  .wei-list {
    flex: 1;
    /* #ifdef MP-WEIXIN */
    height: 100vh;
    /* #endif */
  }
</style>