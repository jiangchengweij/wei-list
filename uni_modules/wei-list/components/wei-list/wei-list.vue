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
      <wei-loading :loadingText="loadingText" :loading="isLoading">
        
      </wei-loading>
    <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    </list>
    <!-- #endif -->
  </view>

</template>
<script setup>
  import { computed } from "vue";
  import { useProvideList } from './context.js';
  import basicProps from './props.js';
  import { useLoading } from "../wei-loading/useLoading.js";
  const emit = defineEmits(['loading', 'refresh']);
  const props = defineProps(basicProps);
  const { isLoading, loadingText, onLoadmore, isFinished } = useLoading(props, emit);
  useProvideList({
    type: 'list',
  })
  const showLoading = computed(() => {
    return !isFinished.value;
  })
</script>
<style>
  .wei-list {
    /* #ifndef APP-NVUE */
    height: 100%;
    /* #endif */
  }
</style>
