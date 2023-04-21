import { computed, ref } from "vue";

export function useLoading(props, emit) {
  var isLoading = ref(false);
  var isFinished = ref(false);
  var loadingTextMap = computed(() => {
    return Object.assign({}, {
      loading: '正在加载...',
      finished: '没有更多了',
      error: '',
    }, props.loadingTextConfig)
  })
  var loadingText = ref(loadingTextMap.value.loading);
  function onLoadmore(e) {
    if(isLoading.value || isFinished.value) { return };
    isLoading.value = true;
    loadingText.value = loadingTextMap.value.loading;
    emit('loadmore', {
      ...e,
      end,
      complete,
    })
  }

  function end() {
    isLoading.value = false;
    isFinished.value =  true;
    loadingText.value = loadingTextMap.value.finished;
  }
  
  function complete() {
    isLoading.value = false;
  }
  
  return {
    isLoading,
    isFinished,
    loadingText,
    onLoadmore,
    end,
    complete
  }
}
