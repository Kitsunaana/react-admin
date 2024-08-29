import { observer } from "mobx-react-lite"
import { ColorInput } from "shared/ui/form/input-color"
import { Text } from "shared/ui/text"
import { useStores } from "../../../model/context"

export const PhotoInputTextColor = observer(() => {
  const { photoPosition } = useStores()

  return (
    <ColorInput
      onChange={photoPosition.changeColor}
      value={photoPosition.color}
      label={<Text onlyText name="forms.textColor" />}
      fullWidth
    />
  )
})
