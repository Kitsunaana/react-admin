export const shallowEqual = (prev, next) => {
  const keys = Object.keys(prev)

  let isEqual = true
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (prev[key] !== next[key]) {
      console.log({
        [`${key}-prev`]: prev[key],
        [`${key}-next`]: next[key],
      })

      isEqual = false
    }
  }

  return isEqual
}

export const stringifiedParams = <TParams extends object>(data: TParams) => {
  const newData = Object.entries(data).reduce((prev, [key, value]) => {
    if (value) prev[key] = value
    return prev
  }, {})

  const searchParams = (new URLSearchParams(newData)).toString()
  return searchParams && `?${searchParams}`
}

export const copyToClipboard = async (data: unknown) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const readOfClipboard = async () => {
  try {
    const readText = await navigator.clipboard.readText()
    return await JSON.parse(readText)
  } catch (error) {
    console.log(error)
  }
}
