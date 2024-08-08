import { useEffect, useState } from "react"

export const useImage = (data?: string | File) => {
  const [src, setSrc] = useState(typeof data === "string" ? data : "")

  if (data === undefined) return

  useEffect(() => {
    if (!(data instanceof File)) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") setSrc(reader.result)
    }

    reader.readAsDataURL(data)
  }, [])

  return src
}
