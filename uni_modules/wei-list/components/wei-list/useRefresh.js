import { nextTick, ref } from "vue";
import { useLoading } from '../wei-loading/useLoading.js';
export function useRefresh(props, emit) {
  var { end } = useLoading(props, emit);
  var refreshing = ref(false);

  function onRefresh(e) {
    if(refreshing.value) return;
    refreshing.value = true;
    emit('refresh', {
      ...e,
      complete,
      end: end,
    });
  }
  
  function complete() {
    uni.stopPullDownRefresh();
    nextTick(() => {
      refreshing.value = false;
    })
  }

  return {
    onRefresh,
    complete,
    refreshing,
  }
}
