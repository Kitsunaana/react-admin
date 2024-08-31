import * as React from "react"
import { TabCommon } from "features/categories/edit/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/edit/ui/tabs/tab-photos"
import { TabCharacteristics } from "features/categories/edit/ui/tabs/tab-characteristics"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { TabTags } from "features/categories/edit/ui/tabs/tab-tags"
import { TabAltNames } from "features/categories/edit/ui/tabs/tab-alt-names"
import { TabPhotoPosition } from "features/categories/edit/ui/tabs/tab-photo-position"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { observer } from "mobx-react-lite"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <>
      {tab === 0 && (<TabCommon />)}
      {tab === 1 && (<TabPhotos />)}
      {tab === 2 && (<TabPhotoPosition />)}
      {tab === 3 && (<RootDialogProvider><TabCharacteristics /></RootDialogProvider>)}
      {tab === 4 && (<RootDialogProvider><TabAltNames /></RootDialogProvider>)}
      {tab === 5 && (<RootDialogProvider><TabTags /></RootDialogProvider>)}
    </>
  )
})
