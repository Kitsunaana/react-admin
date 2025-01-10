import { observer } from "mobx-react-lite"
import { LangContext } from "shared/context/lang"
import { useModalStore } from "shared/hooks/use-modal-store"
import { useCategoryFormContext } from "../../../view-model/form/use-category-form"
import { TabAltNames } from "../alt-names/root"
import { TabCharacteristics } from "../characteristics/root"
import { TabCommon } from "../common"
import { TabPhotoPosition } from "../photo-position/root"
import { TabPhotos } from "../photos/root"
import { TabTags } from "../tags/root"
import { CreateCategoryBody } from "../../../domain/category/requests"

export const Root = observer(({
  formId,
  onCreate,
}: {
  formId: string
  onCreate: (payload: CreateCategoryBody) => void
}) => {
  const tab = useModalStore((store) => store.tab)

  const categoryForm = useCategoryFormContext()

  return (
    <>
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault()

          categoryForm.submit(onCreate)
        }}
      />

      {tab === 0 && <TabCommon />}
      {tab === 1 && <TabPhotos />}
      {tab === 2 && <TabPhotoPosition />}
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
