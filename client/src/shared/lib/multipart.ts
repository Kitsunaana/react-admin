export const createMultipart = (data: Record<string, any>, arrFile: string[] = []) => {
  const result = new FormData()

  const newData = Object.keys(data).reduce((prev, item) => {
    if (arrFile.includes(item)) {
      if (Array.isArray(data[item])) {
        data[item].forEach((item) => {
          if (item.data instanceof File) {
            result.append(item.caption, item.data)
          }
        })
      }
    } else {
      prev[item] = data[item]
    }

    return prev
  }, {})

  result.append("data", JSON.stringify(newData))

  return result
}
