import { LangContext, useLang } from "shared/context/lang"
import { Tab } from "shared/ui/tabs/tab"
import { Tabs } from "shared/ui/tabs/tabs"
import { observer } from "mobx-react-lite"

const tabs = [{ id: 0, caption: "rows" }, { id: 1, caption: "fields" }]

export const Header = observer(({
  tab,
  changeTab,
}: {
  tab: number
  changeTab: (tab: number) => void
}) => (
  <LangContext lang={useLang("tabs")}>
    <Tabs
      tab={tab}
      tabs={tabs.map((tabInfo) => (
        <Tab
          id={tabInfo.id}
          key={tabInfo.id}
          icon={tabInfo.caption}
          caption={tabInfo.caption}
          isActive={tabInfo.id === tab}
          changeTab={changeTab}
        />
      ))}
    />
  </LangContext>
))
