import * as React from "react"
import {
  memo, useEffect, useMemo,
} from "react"
import { Tabs as TabsBase } from "shared/ui/Tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/Tab"

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "done" },
  { id: 1, caption: "Описание", icon: "description" },
  { id: 2, caption: "Фото", icon: "photo" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
]

export interface Option {
  value: string
  icon?: string
  tab?: number
}

interface UseFormProps {
  category: Option
  caption: Option
  description: string
}

interface TabsProps {
  tab: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

export const Tabs = memo((props: TabsProps) => {
  const { tab, onChange } = props

  const {
    getValues, control, trigger,
  } = useFormContext<UseFormProps>()

  useEffect(() => {
    trigger()
  }, [])

  const { errors } = useFormState({ control })

  const tabWithErrors = useMemo(() => Object
    .keys(getValues())
    .filter((property) => errors[property])
    .map((property) => getValues()[property]?.tab), [errors.caption, errors.category, getValues])

  const memoizedTabArray = useMemo(() => tabs.map((tab) => {
    const isError = tabWithErrors.includes(tab.id)

    return (
      <Tab
        key={tab.id}
        isError={isError}
        {...tab}
      />
    )
  }), [tabWithErrors])

  return (
    <TabsBase
      tab={tab}
      onChange={onChange}
      hasError={tabWithErrors.includes(tab)}
      tabs={memoizedTabArray}
    />
  )
})
