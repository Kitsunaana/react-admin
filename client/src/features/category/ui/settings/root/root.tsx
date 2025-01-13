import { LangContext, useLang } from "shared/context/lang"
import { MenuPopup } from "shared/ui/menu-popup"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Header } from "../header"
import { Rows } from "../rows"
import { Fields } from "../fields"

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
