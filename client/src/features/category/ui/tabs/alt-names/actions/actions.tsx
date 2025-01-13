import { useWatch } from "react-hook-form"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { getIsDisabledTranslate } from "../../../../model/alt-name/alt-name-core"
import { TranslateBody } from "../../../../domain/alt-name"
import { useCategoryFormContext } from "../../../../view-model/form/use-category-form"
import { useAltNameStore } from "../../../../model/alt-name/use-alt-name-store"
import { startCreateAltName } from "../../../../model/alt-name/alt-name-events"

export const Actions = ({
  onTranslate,
  isLoading,
}: {
  onTranslate: (payload: TranslateBody) => void
  isLoading: boolean
}) => {
  const control = useCategoryFormContext((state) => state.control)
  const [caption, description] = useWatch({
    name: ["caption", "description"],
    control,
  })

  const list = useAltNameStore((store) => store.list.array)

  const isDisabledTranslate = getIsDisabledTranslate(caption)

  const handleStartCreateAltName = () => startCreateAltName(list)
  const handleStartTranslate = () => onTranslate({ caption, description })

  useKeyboard({
    key: "t",
    disabled: isDisabledTranslate,
    callback: altCtrlKey(handleStartTranslate),
  })

  useKeyboard({
    key: "a",
    callback: altCtrlKey(handleStartCreateAltName),
  })

  return (
    <>
      <IconButton
        name="add"
        onClick={handleStartCreateAltName}
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
        disabled={isDisabledTranslate}
        onClick={handleStartTranslate}
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
  )
}
