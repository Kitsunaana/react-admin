import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useKeyboard } from "shared/lib/keyboard-manager"

export const useHeaderForm = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""

  const form = useForm<{ search: string }>({
    defaultValues: {
      search,
    },
  })

  useKeyboard({
    key: "Enter",
    disabled: !isFocused,
    callback: (event) => {
      const search = form.getValues("search")

      if (event.code === "Enter" && search !== null && isFocused) {
        setSearchParams((prev) => {
          if (search === "") prev.delete("search")
          else {
            prev.set("search", search)
            prev.delete("page")
          }

          return prev
        })
      }
    },
  })

  return {
    handleClear: () => setSearchParams(""),
    handleFocus: () => setIsFocused(true),
    handleBlur: () => setIsFocused(false),
    ...form,
  }
}
