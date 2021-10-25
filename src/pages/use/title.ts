import { watchEffect, Ref } from 'vue'

export const useTitle = (title: Ref<string>): void => {
  watchEffect(() => {
    document.title = `${title.value} | anke-to`
  })
}
