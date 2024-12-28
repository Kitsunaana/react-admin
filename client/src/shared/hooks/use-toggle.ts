import { useState } from "react"

export const useToggle = (defaultValue?: boolean) => {
  const [value, setValue] = useState(defaultValue ?? false)

  const onToggle = () => setValue((prev) => !prev)

  return [value, onToggle] as const
}
