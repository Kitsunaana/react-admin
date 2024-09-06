import * as React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { observer } from "mobx-react-lite"
import { TabCommon } from "features/categories/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/ui/tabs/tab-photos"
import { TabPhotoPosition } from "features/categories/ui/tabs/tab-photo-position"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { TabCharacteristics } from "features/categories/ui/tabs/tab-characteristics"
import { TabAltNames } from "features/categories/ui/tabs/tab-alt-names"
import { TabTags } from "features/categories/ui/tabs/tab-tags"
import { TabPanel } from "shared/ui/tabs/tab-panel"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <>
      <TabPanel value={tab} index={0}><TabCommon /></TabPanel>
      <TabPanel value={tab} index={1}><TabPhotos /></TabPanel>
      <TabPanel value={tab} index={2}><TabPhotoPosition /></TabPanel>
      <TabPanel value={tab} index={3}>
        <RootDialogProvider>
          <TabCharacteristics />
        </RootDialogProvider>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <RootDialogProvider>
          <TabAltNames />
        </RootDialogProvider>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <RootDialogProvider>
          <TabTags />
        </RootDialogProvider>
      </TabPanel>
    </>
  )
})
