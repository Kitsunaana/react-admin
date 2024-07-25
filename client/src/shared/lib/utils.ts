export const shallowEqual = (prev, next) => {
  const keys = Object.keys(prev)

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (prev[key] !== next[key]) {
      console.log({
        [`${key}-prev`]: prev[key],
        [`${key}-next`]: next[key],
      })

      return false
    }
  }

  return true
}
