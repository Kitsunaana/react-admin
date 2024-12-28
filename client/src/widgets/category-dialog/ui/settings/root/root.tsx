import { LangContext, useLang } from "shared/context/lang"
import { MenuPopup } from "shared/ui/menu-popup"
import { observer } from "mobx-react-lite"
import { Rows } from "widgets/category-dialog/ui/settings/rows"
import { Fields } from "widgets/category-dialog/ui/settings/fields"
import { useState } from "react"
import { Header } from "../header"

export const Root = observer(() => {
  const [tab, setTab] = useState(0)

  const langBase = useLang("settings")

  return (
    <MenuPopup>
      <LangContext lang={langBase}>
        <Header
          tab={tab}
          changeTab={setTab}
        />
        <div>
          {tab === 0 && <Rows />}
          {tab === 1 && <Fields />}
        </div>
      </LangContext>
    </MenuPopup>
  )
})
