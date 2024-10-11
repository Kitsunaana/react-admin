import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { observer } from "mobx-react-lite"
import { TabCommon } from "features/categories/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/ui/tabs/tab-photos"
import { TabPhotoPosition } from "features/categories/ui/tabs/tab-photo-position"
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
        <LangContext lang="characteristic">
          <TabCharacteristics />
        </LangContext>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <LangContext lang="altNames">
          <TabAltNames />
        </LangContext>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <LangContext lang="tag">
          <TabTags />
        </LangContext>
      </TabPanel>
    </Box>
  )
})
