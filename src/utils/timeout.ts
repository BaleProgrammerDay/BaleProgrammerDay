let timer = setTimeout(() => {})

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    clearTimeout(timer)
    timer = setTimeout(resolve, ms)
  })
}

export { timeout }