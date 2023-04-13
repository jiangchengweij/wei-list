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
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view>
  <!-- #endif -->
    <wei-refresh v-if="refresherEnable">
      <slot name="refresh"></slot>s
    </wei-refresh>
    <slot></slot>
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
  const props = defineProps(basicProps);
  useProvideList({
    type: 'list',
  })
</script>

<style lang="scss">
  .wei-list {
    flex: 1;
  }
</style>