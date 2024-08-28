import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { Checkbox } from "@mui/material"
import { CustomizeCaption } from "./customize-caption"
import { TPosition } from "../../../model/types"
import { useStores } from "../../../model/context"

type TPositionCheckbox = {
  id: number
  content: string
  position: TPosition
}

const gridCheckbox: Array<{ id: number, data: Array<TPositionCheckbox> }> = [
  {
    id: 0,
    data: [
      { content: "flex-start", position: "top-left", id: 1 },
      { content: "center", position: "top-center", id: 2 },
      { content: "flex-end", position: "top-right", id: 3 },
    ],
  },
  {
    id: 1,
    data: [
      { content: "flex-start", position: "center-left", id: 4 },
      { content: "center", position: "center-center", id: 5 },
      { content: "flex-end", position: "center-right", id: 6 },
    ],
  },
  {
    id: 2,
    data: [
      { content: "flex-start", position: "bottom-left", id: 7 },
      { content: "center", position: "bottom-center", id: 8 },
      { content: "flex-end", position: "bottom-right", id: 9 },
    ],
  },
]

export const CheckBoxGrid = observer(() => {
  const { photoPosition } = useStores()
  const { captionPosition, changeCaptionPosition } = photoPosition

  return (
    <>
      {gridCheckbox.map((row) => (
        <Box key={row.id} flex ai row jc_sp>
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
