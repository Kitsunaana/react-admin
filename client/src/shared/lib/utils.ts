export const shallowEqual = (prev, next) => {
  const keys = Object.keys(prev)

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (prev[key] !== next[key]) {
      console.log({
        [`${key}-prev`]: prev[key],
        [`${key}-next`]: next[key],
      })
    }
  }

  return true
}

export const stringifiedParams = <TParams extends object>(data: TParams) => {
  const newData = Object.entries(data).reduce((prev, [key, value]) => {
    if (value) prev[key] = value
    return prev
  }, {})

  const searchParams = (new URLSearchParams(newData)).toString()
  return searchParams && `?${searchParams}`
}
