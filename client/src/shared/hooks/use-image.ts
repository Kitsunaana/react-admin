import { useEffect, useState } from "react"

const getPath = (data: unknown) => (typeof data === "string"
  ? `http://localhost:3333/${data}`
  : "")

export const useImage = (data?: string | File): string => {
  const [src, setSrc] = useState(getPath(data))

  useEffect(() => {
    setSrc(getPath(data))
  }, [data])

  if (data === undefined) return ""

  useEffect(() => {
    if (!(data instanceof File)) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") setSrc(reader.result)
    }

    reader.readAsDataURL(data)
  }, [data])

  return src
}
