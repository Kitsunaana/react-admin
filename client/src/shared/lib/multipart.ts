export const createMultipart = (data: Record<string, any>, arrFile: string[] = []) => {
  const result = new FormData()

  Object.keys(data).forEach((item) => {
    if (arrFile.includes(item)) {
      if (Array.isArray(data[item])) {
        data[item].forEach((item) => {
          if (item.data instanceof File || item.type.startsWith("image")) {
            result.append("images", item.data)
          }
        })
      }
    } else {
      result.append(item, data[item])
    }
  })

  return result
}
