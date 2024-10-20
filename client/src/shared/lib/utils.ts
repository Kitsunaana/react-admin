export const shallowEqual = (prev: any, next: any) => {
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

export const fileToBase64 = async (file: File): Promise<string | ArrayBuffer> => {
  const reader = new FileReader()

  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.result !== null) resolve(reader.result)
      else reject(new Error("File read unsuccessful"))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export const copyToClipboard = async (data: object) => {
  await navigator.clipboard.writeText(JSON.stringify(data))
}

export const base64ToFile = (base64String: string, filename: string) => {
  const arr = base64String.split(",")
  const mime = (arr[0]!.match(/:(.*?);/) as any)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const readOfClipboard = async () => {
  try {
    const readText = await navigator.clipboard.readText()
    return JSON.parse(readText)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) throw new Error(error.message)
  }
}

export const getNumberOrNull = (value: unknown) => (typeof value === "number" ? value : null)

export const isString = (value: unknown): value is string => typeof value === "string"
export const isNumber = (value: unknown): value is number => typeof value === "number"
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean"
export const isEqual = (right: unknown, left: unknown) => right === left

export const exclude = <T extends object, K extends keyof T>(data: T, keys: K[]) => {
  const entries = Object
    .entries(data)
    .filter(([key, value]) => {
      if (keys.includes(key as K)) return null
      return [key, value]
    })

  return Object.fromEntries(entries)
}

export const include = <T extends object, K extends keyof T>(data: T, keys: readonly K[]) => {
  const entries = Object
    .entries(data)
    .filter(([key, value]) => {
      if (keys.includes(key as K)) return [key, value]
      return null
    })

  return Object.fromEntries(entries)
}
