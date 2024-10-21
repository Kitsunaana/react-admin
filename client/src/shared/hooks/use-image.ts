import { useEffect, useState } from "react"
import { isString } from "shared/lib/utils"

export const useImage = (data?: string | File): string => {
  const [src, setSrc] = useState(isString(data) ? data : "")

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
