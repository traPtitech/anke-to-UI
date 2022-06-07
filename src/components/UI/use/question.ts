export const resize = (e: KeyboardEvent): void => {
  const el = e.target as HTMLTextAreaElement

  el.style.height = 'auto'
  if (e.code === 'Enter') {
    el.style.height = `${el.scrollHeight + 32}px`
  } else {
    el.style.height = `${el.scrollHeight + 5}px`
  }
}
