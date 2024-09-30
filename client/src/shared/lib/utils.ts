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

const fileToBase64 = (file: File) => new Promise<string | ArrayBuffer>((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => reader.result !== null && resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(file)
})

export const copyToClipboard = async (data: Record<string, any>) => {
  const { images, ...other } = data

  const result = await Promise.all((images ?? [])
    .map(async (image) => fileToBase64(image?.data)))

  await navigator.clipboard.writeText(JSON.stringify({
    data: { ...other, images },
    images: result,
  }))
}

export const base64ToFile = (base64String: string, filename: string) => {
  const arr = base64String.split(",")
  const mime = (arr[0]!.match(/:(.*?);/) as any)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const readOfClipboard = async () => {
  try {
    const readText = await navigator.clipboard.readText()
    const parsedData = JSON.parse(readText)

    const { images, ...other } = parsedData
    const { images: sourceImages, ...otherProperties } = other.data
    const imagesFilesOfBase64String = images
      ?.map((base64string: string, index: number) => ({
        ...sourceImages[index],
        data: base64ToFile(base64string, sourceImages[index].caption),
      }))

    return { ...otherProperties, images: imagesFilesOfBase64String }
  } catch (error) {
    console.log(error)
  }
}

export const getNumberOrNull = (value: unknown) => (typeof value === "number" ? value : null)

export const getImageUrl = (name: string) => `http://localhost:3333/uploads/${name}`
