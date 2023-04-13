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
  >
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view>
  <!-- #endif -->
    <slot></slot>
  <!-- #ifndef APP-NVUE -->
  </scroll-view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  </waterfall>
  <!-- #endif -->
</template>

<script setup>
  import { computed } from "vue";
  import { useProvideList } from '../wei-list/context.js';
  import basicProps from './props.js';
  const props = defineProps(basicProps);
  useProvideList({
    type: 'watefall',
    columnCount: computed(() => props.columnCount),
    columnWidth: computed(() => props.columnWidth),
    colummGap: computed(() => props.colummGap),
    leftGap: computed(() => props.leftGap),
    rightGap: computed(() => props.rightGap),
  })
</script>

<style lang="scss">
  
</style>