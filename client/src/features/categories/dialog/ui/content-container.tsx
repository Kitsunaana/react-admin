import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { observer } from "mobx-react-lite"
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { Box } from "shared/ui/box"
import { LangContext } from "shared/context/lang"
import { TabCommon } from "features/categories/dialog/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/dialog/ui/tabs/tab-photos"
import { TabPhotoPosition } from "features/categories/dialog/ui/tabs/tab-photo-position"
import { TabCharacteristics } from "features/categories/dialog/ui/tabs/tab-characteristics"
import { TabAltNames } from "features/categories/dialog/ui/tabs/tab-alt-names"
import { TabTags } from "features/categories/dialog/ui/tabs/tab-tags"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      <TabPanel value={tab} index={0}><TabCommon tab={0} /></TabPanel>
      <TabPanel value={tab} index={1}><TabPhotos tab={1} /></TabPanel>
      <TabPanel value={tab} index={2}><TabPhotoPosition /></TabPanel>
      <TabPanel value={tab} index={3}>
        <LangContext lang="characteristic">
          <TabCharacteristics tab={3} />
        </LangContext>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <LangContext lang="altNames">
          <TabAltNames tab={4} />
        </LangContext>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <LangContext lang="tag">
          <TabTags tab={5} />
        </LangContext>
      </TabPanel>
    </Box>
  )
})
