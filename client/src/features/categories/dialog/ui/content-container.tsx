import { TabAltNames } from "features/categories/dialog/ui/tabs/tab-alt-names"
import { TabCommon } from "features/categories/dialog/ui/tabs/tab-common"
import { TabPhotoPosition } from "features/categories/dialog/ui/tabs/tab-photo-position"
import { TabPhotos } from "features/categories/dialog/ui/tabs/tab-photos"
import { TabTags } from "features/categories/dialog/ui/tabs/tab-tags"
import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { Box } from "shared/ui/box"
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { TabCharacteristics } from "./tabs/tab-characteristics/tab"

interface ContentContainerProps {
  tab: number
}

export const ContentContainer = observer(({ tab }: ContentContainerProps) => (
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
))
