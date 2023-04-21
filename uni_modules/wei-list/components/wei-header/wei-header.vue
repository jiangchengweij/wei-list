<script>
  /**
   * wei-header
   * @description wei-header必须以一级子组件的形式存在于 list waterfall 中,同nvue的header
   * @property {Boolean} sticky 默认 false。是否固定在顶部,wei-waterfall下有效，wei-list无论何值，都会固定顶部，为了list使用对齐
   * @property {Number} top 固定顶部的距离
   * @property {Number} zIndex 层叠属性值
   */
  export default {}
</script>
<template>
  <!-- #ifdef APP-NVUE -->
  <header :style="headerStyle">
  <!-- #endif -->

  <!-- #ifndef APP-NVUE -->
  <view class="wei-header"
    :style="headerStyle"
  >
  <!-- #endif -->
    <slot></slot>
  <!-- #ifndef APP-NVUE -->  
  </view>
  <!-- #endif -->

  <!-- #ifdef APP-NVUE -->
  </header>
  <!-- #endif -->
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useInjectForm } from '../wei-list/context.js';

  const props = defineProps({
    sticky: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 99,
    }
  })
  

  const { type: listType } = useInjectForm();

  const headerStyle = computed(() => {
    const { sticky, top, zIndex } = props;
    const style = {};
     // #ifndef APP-NVUE
    if(listType === 'list' || sticky) {
      const { windowTop } = uni.getWindowInfo();
      style.position = 'sticky';
      style.top = windowTop + top + 'px';
      style.zIndex = zIndex;
    }
    // #endif
    // #ifdef APP-NVUE
    if(listType === 'waterfall' && sticky) {
      style.position = 'sticky';
      style.top = top + 'px';
      style.zIndex = zIndex;
    }
    // #endif
    return style;
  })
</script>

<style>
  .wei-header {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
  }
</style>

