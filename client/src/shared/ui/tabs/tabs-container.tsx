import * as React from "react"
import { useEffect, useMemo } from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/tabs/tab"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"

export interface ITab {
  id: number
  caption: string
  icon?: string
  content?: string[]
}

interface TabsProps {
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

export const TabsContainer = observer((props: TabsProps) => {
  const {
    tabs, langBase, requiredFields = [],
  } = props

  const { tab, changeTab } = useEditDialogStore()

  const tabsWithWarning = useTabsWarning(tabs, requiredFields)

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
        changeTab={changeTab}
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
