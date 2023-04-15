import { computed, nextTick, ref } from "vue";

export function useLoading(props, emit) {
  var isLoading = ref(false);
  var isFinished = ref(false);
  var loadingText = ref('');
  var loadingTextMap = computed(() => {
    return Object.assign({}, {
      loading: '正在刷新...',
      finished: '',
      errro: '',
    }, props.loadingTextConfig)
  })

  function onLoadmore(e) {
    isLoading.value = true;
    loadingText.value = loadingTextMap.value.loading;
    emit('loading', {
      ...e,
      endLoading,
    })
  }

  function endLoading() {
    isLoading.value = false;
  }
  
  return {
    isLoading,
    isFinished,
    loadingText,
    onLoadmore
  }
}