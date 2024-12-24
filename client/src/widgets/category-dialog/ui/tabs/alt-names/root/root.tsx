import { useGetAllLocales } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useWatch } from "react-hook-form"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { AltName } from "shared/types/new_types/types"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import { useAltNameStore } from "../../../../model/alt-names/use-alt-name-store"
import { Layout } from "../layout/layout"
import { List } from "../list/list"

const openModalEvent = createRoute("altName.create.open")
  .withParams<{ altNames: AltName[] }>()

export const Root = observer(() => {
  const list = useAltNameStore((store) => store.altNames)
  const translate = useAltNameStore((store) => store.translate)
  const isLoading = useAltNameStore((store) => store.isLoading)
  const isEmpty = useAltNameStore((store) => store.isEmpty)

  const locales = useGetAllLocales()
  const freeLocales = useAltNameStore((store) => store.getFreeLocale(locales.data))

  const startCreate = () => eventBus.emit(openModalEvent({ altNames: list }))

  const [caption, description] = useWatch({ name: ["caption", "description"] })

  const handleTranslate = () => translate({ caption, description }, freeLocales)

  const isShowSkeletons = freeLocales.length > 0 && isLoading
  const disabled = caption.length < 3

  useKeyboard({
    key: "t",
    disabled,
    callback: altCtrlKey(handleTranslate),
  })

  useKeyboard({
    key: "a",
    callback: altCtrlKey(startCreate),
  })

  return (
    <Layout
      list={isEmpty ? <EmptyList /> : (
        <List
          showSkeletonCount={freeLocales.length}
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
