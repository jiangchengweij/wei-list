<script>
  /**
   * wei-cell
   * @description wei-cell必须以一级子组件的形式存在于 list waterfall 中,同nvue的cell
   * @tutorial https://uniapp.dcloud.net.cn/component/cell.html
   * @property {boolean} keepScollPosition 它控制插入单元格后是否保持最后一个滑动位置。只支持nvue
   * @property {string} insertAnimation = [none|default] cell 的插入动画。当前只支持 none 和 default。只支持nvue
   * @property {string} delete-animation = [none|default]  cell 的删除动画。当前只支持 none 和 default。只支持nvue
   * @property {boolean} recycle 默认值 true。这个属性控制这个 Cell 的 view 和子 views 是否在列表滚动时进行回收。只支持nvue
   * @render-reverse-position {boolean} 默认值 false。定义开始渲染的位置。只支持nvue
   */
  export default {}
</script>
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
  })

  // #ifndef APP-NVUE
  const instance = getCurrentInstance();
  const { columnCount, type: listType, waterfallItemWidth, columnGap, leftGap, addChildren, layout, delay } = useInjectForm();

  onMounted(() => {
    if(listType === 'waterfall' && layout.value === 'absolute') {
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
      }, delay.value)
    }
  })
  
  const curTop = ref(0);
  const curLeft = ref(0);
  const curOpacity = ref(0);
  
  const cellStyle = computed(() => {
    const style = {};
    if(listType === 'waterfall') {
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
  const { rowGap, type: nlistType } = useInjectForm();
  const nCellStyle = computed(() => {
    const style = {};
    if(nlistType === 'waterfall') {
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

