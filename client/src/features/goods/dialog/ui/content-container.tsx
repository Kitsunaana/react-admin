import * as React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { observer } from "mobx-react-lite"
import { TabCommon } from "features/goods/dialog/ui/tabs/tab-common"
import { TabDescription } from "features/goods/dialog/ui/tabs/tab-description"
import { TabPhotos } from "features/goods/dialog/ui/tabs/tab-photos"
import { TabOthers } from "features/goods/dialog/ui/tabs/tab-others"
import { TabCharacteristics } from "features/goods/dialog/ui/tabs/tab-characteristics"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { TabAltNames } from "features/goods/dialog/ui/tabs/tab-alt-names"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <>
      {tab === 0 && (<TabCommon />)}
      {tab === 1 && (<TabDescription />)}
      {tab === 2 && (<TabPhotos />)}
      {tab === 3 && (<TabOthers />)}
      {tab === 4 && (<RootDialogProvider><TabCharacteristics /></RootDialogProvider>)}
      {tab === 5 && (<RootDialogProvider><TabAltNames /></RootDialogProvider>)}
    </>
  )
})
