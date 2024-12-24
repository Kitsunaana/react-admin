import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { useModalStore } from "shared/hooks/use-modal-store"
import { useCategoryForm } from "../../../view-model/form/use-category-form"
import { TabAltNames } from "../alt-names/root"
import { TabCharacteristics } from "../characteristics/root"
import { TabCommon } from "../common"
import { TabPhotoPosition } from "../photo-position/root"
import { TabPhotos } from "../photos/root"
import { TabTags } from "../tags/root"

export const Root = observer(() => {
  const tab = useModalStore((store) => store.tab)

  const createCategoryForm = useCategoryForm({})

  return (
    <>
      {tab === 0 && <TabCommon defaultValue={createCategoryForm.defaultValue} />}
      {tab === 1 && <TabPhotos />}
      {tab === 2 && <TabPhotoPosition defaultValue={createCategoryForm.defaultValue} />}
      {tab === 3 && (
        <LangContext lang="characteristic">
          <TabCharacteristics />
        </LangContext>
      )}
      {tab === 4 && (
        <LangContext lang="altNames">
          <TabAltNames />
        </LangContext>
      )}
      {tab === 5 && (
        <LangContext lang="tag">
          <TabTags />
        </LangContext>
      )}
    </>
  )
})
