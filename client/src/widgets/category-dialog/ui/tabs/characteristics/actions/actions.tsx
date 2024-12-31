import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { startCreateCharacteristic } from "../../../../model/characteristic/characteristic-events"

export const Actions = () => {
  useKeyboard({
    key: "a",
    callback: altCtrlKey(startCreateCharacteristic),
  })

  return (
    <IconButton
      name="add"
      onClick={startCreateCharacteristic}
      help={{
        title: (
          <Text
            onlyText
            name="actions.add"
          />
        ),
      }}
    />
  )
}
