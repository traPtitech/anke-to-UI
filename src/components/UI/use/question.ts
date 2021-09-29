export const resize = (e: KeyboardEvent): void => {
  const el = e.target as HTMLTextAreaElement

  el.style.height = 'auto'
  if (e.code === 'Enter') {
    el.style.height = `${el.scrollHeight + 30}px`
  } else {
    el.style.height = `${el.scrollHeight + 1}px`
  }
}
