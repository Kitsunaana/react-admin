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
import { Box } from "shared/ui/box"
import { LangContext } from "shared/context/lang"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      <TabPanel value={tab} index={0}><TabCommon /></TabPanel>
      <TabPanel value={tab} index={1}><TabPhotos /></TabPanel>
      <TabPanel value={tab} index={2}><TabPhotoPosition /></TabPanel>
      <TabPanel value={tab} index={3}>
        <RootDialogProvider>
          <LangContext lang="characteristic">
            <TabCharacteristics />
          </LangContext>
        </RootDialogProvider>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <RootDialogProvider>
          <LangContext lang="altNames">
            <TabAltNames />
          </LangContext>
        </RootDialogProvider>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <RootDialogProvider>
          <LangContext lang="tag">
            <TabTags />
          </LangContext>
        </RootDialogProvider>
      </TabPanel>
    </Box>
  )
})
