import { useGetAllLocales } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useWatch } from "react-hook-form"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { AltName } from "shared/types/new_types/types"
import { useAltNameStore } from "../../../../model/use-alt-name-store"
import { Layout } from "../layout/layout"
import { List } from "../list/list"

const openModalEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

export const Root = observer(() => {
  const altNames = useAltNameStore()
  const locales = useGetAllLocales()

  const startCreate = () => eventBus.emit(openModalEvent({ altNames: altNames.altNames }))
  const freeLocales = useAltNameStore((store) => store.getFreeLocale(locales.data))

  const [caption, description] = useWatch({ name: ["caption", "description"] })

  const handleTranslate = () => altNames.translate({ caption, description }, freeLocales)

  const isShowSkeletons = freeLocales.length > 0 && altNames.isLoading
  const disabled = caption.length < 3

  useKeyboard({
    key: "t",
    disabled,
    callback: altCtrlKey(handleTranslate),
  })

  return (
    <Layout
      list={(
        <List
          showSkeletonCount={freeLocales.length}
          isEmptyList={altNames.isEmpty}
          isLoading={isShowSkeletons}
        />
      )}
      actions={(
        <>
          <IconButton
            name="add"
            onClick={startCreate}
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
            isLoading={altNames.isLoading}
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
