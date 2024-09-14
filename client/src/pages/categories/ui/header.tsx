import React, { ReactNode, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { useEvent } from "shared/hooks/use-event"
import { useLang } from "shared/context/lang"
import { useTranslation } from "react-i18next"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { BackButton } from "shared/ui/back-button"
import { categoriesUrlStore } from "entities/category"
import queryString from "query-string"

export interface SearchForm {
  search: string
}

interface CategoryHeaderProps {
  createButton: ReactNode
  refetchButton: ReactNode
}

const INPUTS: Record<string, keyof SearchForm> = {
  search: "search",
}

export const CategoryHeader = (props: CategoryHeaderProps) => {
  const { createButton, refetchButton } = props

  const langBase = useLang()?.lang ?? "global"
  const { t } = useTranslation("translation", { keyPrefix: langBase })

  const [isFocused, setIsFocused] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { setValue, getValues, control } = useForm<SearchForm>({
    defaultValues: { search: searchParams.get(INPUTS.search) ?? "" },
  })

  useEffect(() => {
    setValue(INPUTS.search, searchParams.get(INPUTS.search) ?? "")

    categoriesUrlStore.setSearchParams(queryString.parseUrl(window.location.href).query)
  }, [searchParams])

  useEvent("keydown", (event: KeyboardEvent) => {
    const search = getValues(INPUTS.search)
    if (!(event.code === "Enter" && search !== null && isFocused)) return

    categoriesUrlStore.setSearchParams(getValues())
    setSearchParams((prev) => {
      prev.set("search", search)
      return prev
    })
  })

  const onClear = () => {
    categoriesUrlStore.setSearchParams({})
    setSearchParams("")
  }

  return (
    <Box flex ai row gap>
      <Controller
        control={control}
        name={INPUTS.search}
        render={({ field }) => (
          <Input
            {...field}
            sx={{ width: 1 }}
            label={t(INPUTS.search)}
            size="small"
            InputProps={{ fullWidth: true }}
            onClear={onClear}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      />
      <Box flex ai row>
        {refetchButton}
        {createButton}
        <BackButton onClick={() => {
          console.log(searchParams.toString())
        }}
        />
      </Box>
    </Box>
  )
}
