import { useGetAllLocales } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useWatch } from "react-hook-form"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { AltName } from "shared/types/new_types/types"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { useCallback } from "react"
import { useCategoryFormContext } from "../../../../view-model/form/use-category-form"
import { useAltNameStore } from "../../../../model/alt-names/use-alt-name-store"
import { Layout } from "../layout/layout"
import { List } from "../list/list"

const openCreateAltNameModalEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

const startCreateAltName = (altNames: AltName[]) => eventBus.emit(openCreateAltNameModalEvent({ altNames }))

export const Root = observer(() => {
  const control = useCategoryFormContext((state) => state.control)

  const list = useAltNameStore((store) => store.altNames)
  const translate = useAltNameStore((store) => store.translate)
  const isLoading = useAltNameStore((store) => store.isLoading)

  const locales = useGetAllLocales()
  const freeLocales = useAltNameStore((store) => store.getFreeLocale(locales.data))

  const [caption, description] = useWatch({
    control,
    name: ["caption", "description"],
  })

  const handleTranslate = () => translate({ caption, description }, freeLocales)

  const isShowSkeletons = freeLocales.length > 0 && isLoading
  const disabled = caption.length < 3

  const handleStartCreate = useCallback(() => startCreateAltName(list), [list])

  useKeyboard({
    key: "t",
    disabled,
    callback: altCtrlKey(handleTranslate),
  })

  useKeyboard({
    key: "a",
    callback: altCtrlKey(handleStartCreate),
  })

  return (
    <Layout
      list={(
        <List
          showSkeletonCount={freeLocales.length}
          isLoading={isShowSkeletons}
        />
      )}
      actions={(
        <>
          <IconButton
            name="add"
            onClick={handleStartCreate}
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.add"
                />
              ),
            }}
          />
          <IconButton
            name="translate"
            disabled={disabled}
            onClick={handleTranslate}
            isLoading={isLoading}
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.translate"
                />
              ),
            }}
          />
        </>
      )}
    />
  )
})
