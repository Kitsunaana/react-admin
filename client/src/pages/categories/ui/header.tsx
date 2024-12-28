import { ReactNode, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { useEvent } from "shared/hooks/context-menu/use-event"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"

export interface SearchForm {
  search: string
}

interface CategoryHeaderProps {
  actions: ReactNode
}

export const CategoryHeader = (props: CategoryHeaderProps) => {
  const { actions } = props

  const [isFocused, setIsFocused] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""

  const { setValue, getValues, control } = useForm<SearchForm>({
    defaultValues: {
      search,
    },
  })

  useEffect(() => { setValue("search", search) }, [searchParams])

  useEvent("keydown", (event: KeyboardEvent) => {
    const search = getValues("search")

    if (event.code === "Enter" && search !== null && isFocused) {
      setSearchParams((prev) => {
        if (search === "") prev.delete("search")
        else prev.set("search", search)

        return prev
      })
    }
  })

  const onClear = () => setSearchParams("")

  return (
    <Box flex ai row gap>
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <Input
            {...field}
            sx={{ width: 1 }}
            label={<Text name="search" />}
            size="small"
            onClear={onClear}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            InputProps={{ fullWidth: true }}
          />
        )}
      />
      <Box flex ai row>
        {actions}
      </Box>
    </Box>
  )
}
