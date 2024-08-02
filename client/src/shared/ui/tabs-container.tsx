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
  content?: string[]
}

interface TabsProps {
  tab: number
  tabs: ITab[]
  requiredFields?: string[]
  langBase: string
}

export const useTabsWarning = (tabs: ITab[], requiredFields: string[]) => {
  const { getValues, control } = useFormContext()
  const { errors } = useFormState({ control })

  const requiredFieldsDeps = requiredFields.map((field) => errors[field])

  const tabWithWarning = useMemo(() => Object
    .keys(getValues())
    .filter((property) => errors[property])
    .map((property) => {
      const findTabWithWarning = tabs.find((tab) => tab?.content?.includes(property))

      return findTabWithWarning && findTabWithWarning.id
    }), [...requiredFieldsDeps, getValues])

  return {
    tabWithWarning,
  }
}

export const TabsContainer = memo((props: TabsProps) => {
  const {
    tabs, tab: tabProps, langBase, requiredFields = [],
  } = props

  const [tab, setTab] = useState(tabProps)
  const { tabWithWarning } = useTabsWarning(tabs, requiredFields)
  const { handleSubmit } = useFormContext()

  useEffect(() => { handleSubmit(() => {})() }, [])

  useEffect(() => addEvent(`${langBase}.changeTab` as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  const memoizedTabArray = useMemo(() => tabs.map((tab) => {
    const isError = tabWithWarning.includes(tab.id)

    return (
      <Tab
        langBase={langBase}
        key={tab.id}
        isError={isError}
        caption={tab.caption}
        id={tab.id}
        icon={tab.icon}
      />
    )
  }), [tabWithWarning])

  return (
    <Tabs
      tab={tab}
      hasError={tabWithWarning.includes(tab)}
      tabs={memoizedTabArray}
    />
  )
})
