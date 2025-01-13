import { DialogHeaderCaption, ModalHeader } from "shared/ui/dialog/dialog-header"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { observer } from "mobx-react-lite"
import { Settings } from "../../ui/settings/root"
import { useCopyPaste } from "../../view-model/use-copy-paste"
import { CreateClearButton } from "./create-clear-button"

export const CreateHeader = observer(() => {
  const copyPaste = useCopyPaste()

  return (
    <ModalHeader
      title={<DialogHeaderCaption name="create" />}
      right={{
        separator: true,
        components: [
          <IconButton
            key="copy"
            name="copy"
            onClick={copyPaste.onCopy}
            help={{
              title: (
                <Text
                  onlyText
                  langBase="global.dialog"
                  name="copy"
                />
              ),
            }}
          />,

          <IconButton
            key="paste"
            name="paste"
            onClick={copyPaste.onPaste}
            help={{
              title: (
                <Text
                  onlyText
                  langBase="global.dialog"
                  name="paste"
                />
              ),
            }}
          />,

          <Settings key="settings" />,
        ],
      }}
      left={{
        components: [
          <CreateClearButton key="clear" />,
        ],
      }}
    />
  )
})
