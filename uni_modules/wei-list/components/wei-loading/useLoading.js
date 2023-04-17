import { computed, ref } from "vue";

export function useLoading(props, emit) {
  var isLoading = ref(false);
  var isFinished = ref(false);
  var loadingText = ref('');
  var loadingTextMap = computed(() => {
    return Object.assign({}, {
      loading: '正在加载...',
      finished: '没有更多了',
      errro: '',
    }, props.loadingTextConfig)
  })
  
  function onLoadmore(e) {
    if(isFinished.value) { return };
    isLoading.value = true;
    loadingText.value = loadingTextMap.value.loading;
    emit('loading', {
      ...e,
      endLoading,
      stopLoading,
    })
  }

  function endLoading() {
    isLoading.value = false;
    isFinished.value=  true;
    loadingText.value = loadingTextMap.value.finished;
  }
  
  function stopLoading() {
    isLoading.value = false;
  }
  
  return {
    isLoading,
    isFinished,
    loadingText,
    onLoadmore
  }
}
