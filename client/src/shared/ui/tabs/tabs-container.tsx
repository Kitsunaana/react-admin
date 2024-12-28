import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useLang } from "shared/context/lang"
import { Tab } from "shared/ui/tabs/tab"
import { Tabs } from "shared/ui/tabs/tabs"
import { useModalStore } from "shared/hooks/use-modal-store"
import { DeepRequired, FieldErrorsImpl, FieldValues } from "react-hook-form"

export const useTabsWarning = <T extends FieldValues, >({
  tabs,
  errors,
  requiredFields,
  getValues,
}: {
  tabs: ITab[],
  errors: Partial<FieldErrorsImpl<DeepRequired<T>>>
  requiredFields: (keyof T)[],
  getValues: () => T
}) => {
  const requiredFieldsDeps = requiredFields.map((field) => errors[field])

  return useMemo(() => Object
    .keys(getValues())
    .filter((property) => errors[property as keyof T])
    .map((property) => {
      const findTabWithWarning = tabs.find((tab) => tab?.content?.includes(property))

      return findTabWithWarning && findTabWithWarning.id
    }), [...requiredFieldsDeps, getValues])
}

export type ITab = {
  id: number
  caption: string
  icon?: string
  content?: string[]
}

export const TabsContainer = observer(({
  tabs,
  tabsWithWarning,
}: {
  tabs: ITab[]
  tabsWithWarning: (number | undefined)[]
}) => {
  const modal = useModalStore()
  const langBase = useLang("tabs")

  const memoizedTabsArray = useMemo(() => tabs.map((item) => {
    const isError = tabsWithWarning.includes(item.id)

    return (
      <Tab
        key={item.id}
        id={item.id}
        caption={item.caption}
        icon={item.icon}
        isError={isError}
        isActive={modal.tab === item.id}
        changeTab={modal.changeTab}
        langBase={langBase}
      />
    )
  }), [tabsWithWarning, modal.tab])

  return (
    <Tabs
      tab={modal.tab}
      tabs={memoizedTabsArray}
    />
  )
})
