import { Checkbox } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Caption } from "../caption"
import { CheckboxInner, CheckboxWrapper } from "./styles"
import { usePhotoPositionStore } from "../../../../model/photo-position/use-photo-position-store"
import { usePhotoPositionForm } from "../../../../view-model/form/use-photo-position-form"
import { GRID_CHECKBOX } from "../../../../domain/const"

export const CheckboxGrid = observer(() => {
  const photoPositionForm = usePhotoPositionForm()

  const captionPosition = usePhotoPositionStore((store) => store.captionPosition)
  const changeCaptionPosition = usePhotoPositionStore((store) => store.changeCaptionPosition)

  return (
    <>
      {GRID_CHECKBOX.map((row) => (
        <CheckboxWrapper key={row.id}>
          {row.data.map(({ id, content, position }) => (
            <CheckboxInner content={content} key={id}>
              {captionPosition === position
                ? (<Caption />)
                : (
                  <Checkbox
                    onChange={() => (
                      photoPositionForm
                        .handleCaptionPositionChange(position, changeCaptionPosition)
                    )}
                  />
                )}
            </CheckboxInner>
          ))}
        </CheckboxWrapper>
      ))}
    </>
  )
})
