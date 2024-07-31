import * as React from "react"
import {
  memo, useEffect, useMemo,
} from "react"
import { Tabs } from "shared/ui/tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/tab"

export interface ITab {
  id: number
  caption: string
  icon?: string
}

export interface IOption {
  value: string
  icon?: string
  tab?: number
}

interface UseFormProps {
  category: IOption
  caption: IOption
  description: string
}

interface TabsProps {
  tab: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  tabs: ITab[]
}

export const TabsContainer = memo((props: TabsProps) => {
  const { tab, onChange, tabs } = props

  const {
    getValues, control, handleSubmit,
  } = useFormContext<UseFormProps>()

  const { errors } = useFormState({ control })

  useEffect(() => { handleSubmit(() => {})() }, [])

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
    <Tabs
      tab={tab}
      onChange={onChange}
      hasError={tabWithErrors.includes(tab)}
      tabs={memoizedTabArray}
    />
  )
})
