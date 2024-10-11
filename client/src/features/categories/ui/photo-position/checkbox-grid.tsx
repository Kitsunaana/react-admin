import { Checkbox } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { GRID_CHECKBOX } from "../../model/constants"
import { useCategoryStores } from "../../model/context"
import { CustomizeCaption } from "./customize-caption"

export const CheckBoxGrid = observer(() => {
  const { photoPosition } = useCategoryStores()
  const { captionPosition, changeCaptionPosition } = photoPosition

  return (
    <>
      {GRID_CHECKBOX.map((row) => (
        <Box key={row.id} flex ai row jc_sp sx={{ height: "33.33333333%" }}>
          {row.data.map(({ id, content, position }) => (
            <Box
              flex
              row
              key={id}
              sx={{ flexBasis: "33.33%", justifyContent: content }}
            >
              {captionPosition === position
                ? (<CustomizeCaption />)
                : (<Checkbox onChange={() => changeCaptionPosition(position)} />)}
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
})
