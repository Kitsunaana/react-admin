import { useMemo } from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { useFormContext, useFormState } from "react-hook-form"
import { Tab } from "shared/ui/tabs/tab"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useLang } from "shared/context/lang"

export interface ITab {
  id: number
  caption: string
  icon?: string
  content?: string[]
}

interface TabsProps {
  tabs: ITab[]
  requiredFields?: string[]
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
    tabs, requiredFields = [],
  } = props

  const langBase = useLang()
  const tabsWithWarning = useTabsWarning(tabs, requiredFields)
  const { tab, changeTab } = useEditDialogStore()

  const memoizedTabsArray = useMemo(() => tabs.map((item) => {
    const isError = tabsWithWarning.includes(item.id)

    return (
      <Tab
        key={item.id}
        id={item.id}
        caption={item.caption}
        icon={item.icon}
        isError={isError}
        isActive={tab === item.id}
        changeTab={changeTab}
        langBase={langBase}
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
