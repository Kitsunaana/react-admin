import { Checkbox, FormControlLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Text } from "shared/ui/text"
import { useStores } from "../../../model/context"

export const CheckboxShowPhoto = observer(() => {
  const { photoPosition } = useStores()

  return (
    <FormControlLabel
      label={<Text onlyText name="forms.showPhotoInListGoods" />}
      control={(
        <Checkbox
          sx={{ ml: 1, mr: 1, p: 0.75 }}
          onChange={photoPosition.changeShowPhoto}
          checked={photoPosition.isShowPhotoWithGoods}
        />
      )}
    />
  )
})
