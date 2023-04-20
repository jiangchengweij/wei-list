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
      default: 299,
    }
  })
  const { type: listType } = useInjectForm();

  const headerStyle = computed(() => {
    const { sticky, top, zIndex } = props;
    const style = {};
    if(listType.value === 'list' || sticky) {
      const { windowTop } = uni.getWindowInfo();
      style.position = 'sticky';
      style.top = windowTop + top + 'px';
      style.zIndex = zIndex;
    }
    return style;
  })
</script>

<style>
  .wei-header {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  }
</style>

