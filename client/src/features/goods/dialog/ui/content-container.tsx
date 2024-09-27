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
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { Box } from "shared/ui/box"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      <TabPanel index={0} value={tab}><TabCommon /></TabPanel>
      <TabPanel index={1} value={tab}><TabDescription /></TabPanel>
      <TabPanel index={2} value={tab}><TabPhotos /></TabPanel>
      <TabPanel index={3} value={tab}><TabOthers /></TabPanel>
      <TabPanel index={4} value={tab}>
        <RootDialogProvider>
          <TabCharacteristics />
        </RootDialogProvider>
      </TabPanel>
      <TabPanel index={5} value={tab}>
        <RootDialogProvider>
          <TabAltNames />
        </RootDialogProvider>
      </TabPanel>
    </Box>
  )
})
