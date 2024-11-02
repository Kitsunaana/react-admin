import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { observer } from "mobx-react-lite"
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { Box } from "shared/ui/box"
import { LangContext } from "shared/context/lang"
import { TabCommon } from "features/categories/dialog/ui/tabs/tab-common"
import { TabPhotos } from "features/categories/dialog/ui/tabs/tab-photos"
import { TabPhotoPosition } from "features/categories/dialog/ui/tabs/tab-photo-position"
import { TabAltNames } from "features/categories/dialog/ui/tabs/tab-alt-names"
import { TabTags } from "features/categories/dialog/ui/tabs/tab-tags"
import { TabCharacteristics } from "./tabs/tab-characteristics/tab"

export const ContentContainer = observer(() => {
  const { tab } = useEditDialogStore()

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      {tab === 0 && (
        <TabPanel value={tab} index={0}><TabCommon tab={0} /></TabPanel>
      )}
      {tab === 1 && (
        <TabPanel value={tab} index={1}><TabPhotos tab={1} /></TabPanel>
      )}
      {tab === 2 && (
        <TabPanel value={tab} index={2}><TabPhotoPosition /></TabPanel>
      )}
      {tab === 3 && (
        <TabPanel value={tab} index={3}>
          <LangContext lang="characteristic">
            <TabCharacteristics tab={3} />
          </LangContext>
        </TabPanel>
      )}
      {tab === 4 && (
        <TabPanel value={tab} index={4}>
          <LangContext lang="altNames">
            <TabAltNames tab={4} />
          </LangContext>
        </TabPanel>
      )}
      {tab === 5 && (
        <TabPanel value={tab} index={5}>
          <LangContext lang="tag">
            <TabTags tab={5} />
          </LangContext>
        </TabPanel>
      )}
    </Box>
  )

  /* return (
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
  ) */
})
