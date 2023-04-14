import { ref } from "vue";

export function useLoading(porps, emit) {
  var isLoading = ref(false);
  var isError = ref(false);
  var isFinished = ref(false);
  var loadingText = ref('');
  function onLoadmore(e) {
    isLoading.value = true;
    loadingText.value = '加载中...'
    setTimeout(() => {
      isLoading.value = false;
    }, 2000)
  }
  
  return {
    isLoading,
    isFinished,
    loadingText,
    onLoadmore
  }
}