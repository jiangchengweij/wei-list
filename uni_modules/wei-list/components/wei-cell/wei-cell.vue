<template>
  <!-- #ifdef APP-NVUE -->
  <cell
    :keepScollPosition="keepScollPosition"
    :insetAnimation="insetAnimation"
    :recycle="recycle"
    :renderReversePosition="renderReversePosition"
  >
    <view :style="nCellStyle">
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view class="wei-cell" :style="cellStyle">
    <!-- #endif -->
      <slot></slot>
    <!-- #ifndef APP-NVUE -->
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    </view>
  </cell>
  <!-- #endif -->
</template>

<script setup>
  import { computed, onMounted, getCurrentInstance, ref } from "vue";
  import { useInjectForm } from '../wei-list/context.js';
  import { getToNum } from '../wei-list/util.js';

  const props = defineProps({
    keepScollPosition: {
      type: Boolean,
      default: false,
    },
    insetAnimation: {
      type: String,
      default: 'none',
    },
    recycle: {
      type: Boolean,
      default: true
    },
    renderReversePosition: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: null,
    }
  })

  // #ifndef APP-NVUE
  const instance = getCurrentInstance();
  const { columnCount, type: listType, waterfallItemWidth, columnGap, leftGap, addChildren, layout } = useInjectForm();

  onMounted(() => {
    if(listType === 'watefall' && layout.value === 'absolute') {
      setTimeout(() => {
        uni.createSelectorQuery().in(instance)
          .select('.wei-cell')
          .boundingClientRect((res) => {
            addChildren(res, ({ top, left }) => {
              //console.log(top, left);
              curTop.value = top;
              curLeft.value = left;
              curOpacity.value = 1;
            });
          }).exec();
      }, 200)
    }
  })
  
  const curTop = ref(0);
  const curLeft = ref(0);
  const curOpacity = ref(0);
  
  const cellStyle = computed(() => {
    const { index } = props;
    const style = {};
    if(listType === 'watefall') {
      if(layout.value === 'absolute') { //布局方式
        style.position = 'absolute';
        if(waterfallItemWidth.value > 0) {
          style.width = waterfallItemWidth.value + 'px';
        }
        style.top = curTop.value + 'px';
        style.left = curLeft.value + 'px';
        style.opacity = curOpacity;
      }
    } else {
      style.width = '100%';
    }
    return style;
  })
  // #endif
  // #ifdef APP-NVUE
  const { rowGap, type: listType } = useInjectForm();
  const nCellStyle = computed(() => {
    const style = {};
    if(listType === 'watefall') {
      if(rowGap.value) {
        style.marginBottom = rowGap.value + 'px';
      }
    }
    return style;
  })
  // #endif
</script>

<style>

</style>

