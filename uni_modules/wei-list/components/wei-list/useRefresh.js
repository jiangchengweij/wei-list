import { computed, nextTick, ref } from "vue";
import { getPx } from "./util";

export function useRefresh(props, emit) {
  var refreshing = ref(false);
  var refreshShow = ref(false);
  var pulling = ref(false); //下拉过程
  var loosing = ref(false); //释放过程
  var refreshTextMap = computed(() => {
    return Object.assign({}, {
      pulling: '下拉即可刷新...',
      loading: '正在刷新...',
      success: '',
      lossing: '释放即可刷新...'
    }, props.refreshTextConfig);
  });
  var refreshText = ref('');
  const refreshHeight = computed(() => {
    return getPx(props.headHeight);
  })
  function onRefresh(e) {
    refreshing.value = true;
    loosing.value = false;
    refreshText.value = refreshTextMap.value.loading;
    emit('refresh', {
      ...e,
      endRefresh
    });
  }
  function endRefresh() {
    refreshShow.value = false;
    //加一定延时，防止渲染过程中再次触发下拉刷新
    setTimeout(() => {
      refreshing.value = false;
    }, 500)
  }
  function onPullingdown(e) {
    if(refreshing.value) return;
    refreshShow.value = true;
    // #ifdef APP-NVUE
    if(Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
      loosing.value = true;
      pulling.value = false;
      refreshText.value = refreshTextMap.value.lossing;
    } else {
      pulling.value = true;
      refreshText.value = refreshTextMap.value.pulling;
    }
    // #endif
  }
  return {
    onRefresh,
    onPullingdown,
    refreshText,
    refreshing,
    refreshShow,
    pulling,
    loosing,
    refreshHeight
  }
}
