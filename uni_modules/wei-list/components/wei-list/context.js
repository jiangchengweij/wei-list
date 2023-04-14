import { inject, provide } from "vue";

export const listContextKey = 'weiListContext_001';

export const useProvideList = (state) => {
  provide(listContextKey, {
    type: 'list',
    ...state
  })
}

export const useInjectForm = () => {
  return inject(listContextKey)
}
