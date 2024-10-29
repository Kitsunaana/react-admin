import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useSetDialogValues, UseSetValuesClear } from "shared/hooks/use-set-dialog-values"
import { useGetConfirmation } from "shared/lib/confirmation"
import { CategoryDto } from "shared/types/category"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { MenuPopup } from "shared/ui/menu-popup"
import { TabsContainer } from "shared/ui/tabs/tabs-container"
import { LangContext, useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"
import { eventBus } from "shared/lib/event-bus"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { ContentContainer } from "../content-container"
import { useCreateCategory } from "../../queries/use-create-category"
import { useCategoryStores } from "../context"
import { CATEGORY_DEFAULT_VALUES, TABS } from "../../domain/const"
import { useCopyPaste } from "../../../@copy-paste-settings/hooks/use-copy"
import { PasteSettings } from "./paste-settings/paste-settings"
import { updateCaption } from "../../domain/event"

export const useClearDialog = () => {
  const langBase = "catalog.confirm.clear"
  const getConfirmation = useGetConfirmation()

  return async (callback: UseSetValuesClear) => {
    const confirmation = await getConfirmation({
      langBase,
      description: <Text langBase={langBase} name="description" />,
      confirmText: "confirm",
    })

    if (confirmation) callback()
  }
}

export const CategoryCreateDialog = observer(() => {
  const langBase = useLang()

  const methods = useForm<CategoryDto.CategoryCreate>({ defaultValues: CATEGORY_DEFAULT_VALUES })
  const dialogStore = useCreateDialogStore()
  const categoryStore = useCategoryStores()
  const handleClear = useClearDialog()

  const { onCreate, isLoadingCreate, isSuccessCreate } = useCreateCategory()

  const { apply, clear } = useSetDialogValues({
    data: CATEGORY_DEFAULT_VALUES,
    defaults: CATEGORY_DEFAULT_VALUES,
    setData: [
      (data) => categoryStore.historyStore.setCategory({ ...data, ...categoryStore.getData() }),
    ],
    clearData: [categoryStore.destroy, methods.reset],
    shouldHandle: [dialogStore.open],
  })

  const { handleCopy, handlePaste } = useCopyPaste(apply, methods, (payload) => {
    eventBus.emit(updateCaption({ caption: payload.caption }))
  })

  const handleSubmit = (payload: CategoryDto.CategoryFields) => {
    onCreate({
      ...payload,
      ...categoryStore.getData(),
    })
  }

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        close={isSuccessCreate}
        store={dialogStore}
        handleSubmit={handleSubmit}
        isLoading={isLoadingCreate}
        container={<ContentContainer />}
        header={(
          <DialogHeader
            store={dialogStore}
            onCopyClick={handleCopy}
            onPasteClick={handlePaste}
            onClearClick={() => handleClear(clear)}
            showActions
            settings={(
              <MenuPopup>
                <LangContext lang={`${langBase}.settings`}>
                  <PasteSettings />
                </LangContext>
              </MenuPopup>
            )}
            title={(
              <DialogHeaderCaption
                name="title.create"
                value="Пиццы"
              />
            )}
          />
        )}
        tabs={(
          <LangContext lang={`${langBase}.tabs`}>
            <TabsContainer
              tabs={TABS}
              requiredFields={["caption"]}
            />
          </LangContext>
        )}
        footer={(
          <Box flex row gap ai>
            <IconButton
              name="undo"
              disabled={!categoryStore.historyStore.canUndo}
              onClick={() => {
                categoryStore.historyStore.undo()

                methods.reset(categoryStore.category)
              }}
            />
            <IconButton
              name="redo"
              disabled={!categoryStore.historyStore.canRedo}
              onClick={() => {
                categoryStore.historyStore.redo()

                methods.reset(categoryStore.category)
              }}
            />
          </Box>
        )}
        PaperProps={{
          sx: {
            ...(dialogStore.fullScreen
              ? { borderRadius: "0px !important" }
              : {}),
          },
        }}
      />
    </FormProvider>
  )
})
