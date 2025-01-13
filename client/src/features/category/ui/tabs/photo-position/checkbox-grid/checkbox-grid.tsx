import { Checkbox } from "@mui/material"
import { observer } from "mobx-react-lite"
import { GRID_CHECKBOX } from "../../../../view-model/const"
import { usePhotoPositionStore } from "../../../../model/photo-position/use-photo-position-store"
import { Caption } from "../caption"
import { CheckboxInner, CheckboxWrapper } from "./styles"

export const CheckboxGrid = observer(() => {
  const captionPosition = usePhotoPositionStore((store) => store.captionPosition)
  const changeCaptionPosition = usePhotoPositionStore((store) => store.changeCaptionPosition)

  return (
    <>
      {GRID_CHECKBOX.map((row) => (
        <CheckboxWrapper key={row.id}>
          {row.data.map(({ id, content, position }) => (
            <CheckboxInner content={content} key={id}>
              {captionPosition === position
                ? <Caption />
                : <Checkbox onChange={() => changeCaptionPosition(position)} />}
            </CheckboxInner>
          ))}
        </CheckboxWrapper>
      ))}
    </>
  )
})
