import { useEffect, useState } from "react"
import { useLang } from "shared/context/Lang"
import { addEvent } from "shared/lib/event"
import * as React from "react"
import { TabCommon } from "features/categories/create-and-edit/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/create-and-edit/ui/tabs/tab-photos"
import { TabCharacteristics } from "features/categories/create-and-edit/ui/tabs/tab-characteristics"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { TabTags } from "features/categories/create-and-edit/ui/tabs/tab-tags"
import { TabAltNames } from "features/categories/create-and-edit/ui/tabs/tab-alt-names"
import { TabPhotoPosition } from "features/categories/create-and-edit/ui/tabs/tab-photo-position"

interface ContentContainerProps {
  tab: number
  langBase?: string
}

export const ContentContainer = (props: ContentContainerProps) => {
  const { tab: tabProps, langBase: langBaseProps } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [tab, setTab] = useState(tabProps)

  useEffect(() => addEvent(`${langBase}.changeTab` as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  return (
    <>
      {tab === 0 && (<TabCommon />)}
      {tab === 1 && (<TabPhotos />)}
      {tab === 2 && (<TabPhotoPosition />)}
      {tab === 3 && (<TabCharacteristics />)}
      {tab === 4 && (<RootDialogProvider><TabAltNames /></RootDialogProvider>)}
      {tab === 5 && (<RootDialogProvider><TabTags /></RootDialogProvider>)}
    </>
  )
}
