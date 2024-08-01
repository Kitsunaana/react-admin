import * as React from "react"
import {
  memo, useEffect, useMemo, useState,
} from "react"
import { Tabs } from "shared/ui/tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/tab"
import { addEvent } from "shared/lib/event"

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
  tabs: ITab[]
  requiredFields?: string[]
}

export const TabsContainer = memo((props: TabsProps) => {
  const { tabs, tab: tabProps, requiredFields = [] } = props

  const [tab, setTab] = useState(tabProps)

  useEffect(() => addEvent("dialog.catalog.changeTab" as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  const {
    getValues, control, handleSubmit,
  } = useFormContext<UseFormProps>()

  const { errors } = useFormState({ control })

  useEffect(() => { handleSubmit(() => {})() }, [])

  const requiredFieldsDeps = requiredFields.map((field) => errors[field])

  const tabWithErrors = useMemo(() => Object
    .keys(getValues())
    .filter((property) => errors[property])
    .map((property) => getValues()[property]?.tab), [...requiredFieldsDeps, getValues])

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
      hasError={tabWithErrors.includes(tab)}
      tabs={memoizedTabArray}
    />
  )
})
