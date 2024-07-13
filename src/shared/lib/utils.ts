export const shallowEqual = (prev, next) => {
  const keys = Object.keys(prev)

  // console.log(keys)
  for (const key of keys) {
    if (prev[key] !== next[key]) {
      console.log({
        [`${key}-prev`]: prev[key],
        [`${key}-next`]: next[key],
        name: prev.list.name,
      })

      // console.log(prev.sublist === next.sublist)

      return false
    }
  }

  return true
}
