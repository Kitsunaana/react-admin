export const createMultipart = (data: Record<string, any>, arrFile: string[] = []) => {
  const result = new FormData()

  Object.keys(data).forEach((key) => {
    if (arrFile.includes(key)) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          if (item.data instanceof File) {
            result.append("images", item.data)
          }
        })
      }
    } else {
      result.append(key, typeof data[key] === "object"
        ? JSON.stringify(data[key]) : data[key])
    }
  })

  return result
}
