import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useFormContext, useFormState } from "react-hook-form"
import { useLang } from "shared/context/lang"
import { DialogStore } from "shared/stores/dialog-store"
import { Tab } from "shared/ui/tabs/tab"
import { Tabs } from "shared/ui/tabs/tabs"

export interface ITab {
  id: number
  caption: string
  icon?: string
  content?: string[]
}

interface TabsProps {
  tabs: ITab[]
  requiredFields?: string[]
  store: DialogStore
  handleChangeTab?: (tab: number) => void
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
    tabs, store, handleChangeTab, requiredFields = [],
  } = props

  const langBase = useLang()
  const tabsWithWarning = useTabsWarning(tabs, requiredFields)
  const { tab, changeTab } = store

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
        changeTab={(tab) => {
          changeTab(tab)
          handleChangeTab?.(tab)
        }}
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
