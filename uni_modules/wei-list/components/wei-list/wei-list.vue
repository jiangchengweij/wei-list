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
  <scroll-view>
  <!-- #endif -->
    <wei-refresh v-if="refresherEnable" 
      @refresh="onRefresh" 
      @pullingdown="onPullingdown" 
      :refreshText="refreshText"
      :show="refreshShow"></wei-refresh>
    <slot></slot>
    <wei-loading :loadingText="loadingText" :show="showLoading"></wei-loading>
  <!-- #ifndef APP-NVUE -->
  </scroll-view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  </list>
  <!-- #endif -->
</template>

<script setup>
  import { computed } from "vue";
  import { useProvideList } from './context.js';
  import basicProps from './props.js';
  import { useLoading } from "./useLoading.js";
  import { useRefresh } from "./useRefresh.js";
  const props = defineProps(basicProps);
  const { onRefresh, onPullingdown, refreshText, refreshShow, refreshing } = useRefresh(props);
  const { isLoading, loadingText, onLoadmore, isFinished } = useLoading(props);
  useProvideList({
    type: 'list',
  })
  const showLoading = computed(() => {
    return !isFinished.value;
  })
</script>

<style lang="scss">
  .wei-list {
    flex: 1;
  }
</style>