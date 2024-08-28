import * as React from "react"
import {
  memo, useEffect, useMemo, useState,
} from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/tabs/tab"
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

  return useMemo(() => Object
    .keys(getValues())
    .filter((property) => errors[property])
    .map((property) => {
      const findTabWithWarning = tabs.find((tab) => tab?.content?.includes(property))

      return findTabWithWarning && findTabWithWarning.id
    }), [...requiredFieldsDeps, getValues])
}

export const TabsContainer = memo((props: TabsProps) => {
  const {
    tabs, tab: tabProps, langBase, requiredFields = [],
  } = props

  const [tab, setTab] = useState(tabProps)
  const tabsWithWarning = useTabsWarning(tabs, requiredFields)
  const methods = useFormContext()

  useEffect(() => { methods.handleSubmit(() => {})() }, [])

  useEffect(() => addEvent(`${langBase}.changeTab` as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  const memoizedTabsArray = useMemo(() => tabs.map((item) => {
    const isError = tabsWithWarning.includes(item.id)

    return (
      <Tab
        isActive={tab === item.id}
        langBase={langBase}
        key={item.id}
        isError={isError}
        caption={item.caption}
        id={item.id}
        icon={item.icon}
      />
    )
  }), [tabsWithWarning, tab])

  return (
    <Tabs
      tab={tab}
      hasError={tabsWithWarning.includes(tab)}
      tabs={memoizedTabsArray}
    />
  )
})
