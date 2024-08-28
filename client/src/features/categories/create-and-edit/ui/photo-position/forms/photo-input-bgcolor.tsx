import { ColorInput } from "shared/ui/form/input-color"
import { observer } from "mobx-react-lite"
import { Text } from "shared/ui/text"
import { useStores } from "../../../model/context"

export const ChangeBgColor = observer(() => {
  const { photoPosition } = useStores()

  return (
    <ColorInput
      label={<Text onlyText name="forms.bgColor" />}
      onChange={photoPosition.changeBgColor}
      value={photoPosition.bgColor}
      fullWidth
    />
  )
})
