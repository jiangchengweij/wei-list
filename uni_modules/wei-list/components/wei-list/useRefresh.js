import { computed, ref } from "vue";

export function useRefresh(props) {
  var refreshing = ref(false);
  var refreshShow = ref(false);
  var refreshTextMap = computed(() => {
    return Object.assign({}, {
      pulling: '下拉即可刷新...',
      loading: '加载中...',
      success: '',
      lossing: '释放即可刷新...'
    }, props.refreshTextConfig);
  });
  var refreshText = ref('');
  function onRefresh() {
    refreshing.value = true;
    refreshText.value = refreshTextMap.value.loading;
    setTimeout(() => {
      refreshing.value = false;
      refreshShow.value = false;
    }, 3000)
  }
  function onPullingdown(e) {
    if(refreshing.value) return;
    refreshShow.value = true;
    if(Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
      refreshText.value = refreshTextMap.value.lossing;
    } else {
      refreshText.value = refreshTextMap.value.pulling;
    }
  }
  return {
    onRefresh,
    onPullingdown,
    refreshText,
    refreshing,
    refreshShow,
  }
}
