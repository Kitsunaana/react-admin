import { Checkbox } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Box, BoxProps } from "shared/ui/box"
import { styled } from "@mui/material/styles"
import { nanoid } from "nanoid"
import { GRID_CHECKBOX } from "../../../domain/const"
import { useCategoryStores } from "../../context"
import { CustomizeCaption } from "./customize-caption"

const CheckboxWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "33.3333%",
}))

interface CheckboxInnerProps extends BoxProps {
  content: string
}

const CheckboxInner = styled(
  ({ content, ...other }: CheckboxInnerProps) => <Box {...other} />,
)(({ content }) => ({
  display: "flex",
  flexBasis: "33.3333%",
  justifyContent: content,
}))

export const CheckBoxGrid = observer(() => {
  const { photoPositionStore, historyStore } = useCategoryStores()
  const { captionPosition, changeCaptionPosition } = photoPositionStore

  return (
    <>
      {GRID_CHECKBOX.map((row) => (
        <CheckboxWrapper key={row.id}>
          {row.data.map(({ id, content, position }) => (
            <CheckboxInner
              content={content}
              key={id}
            >
              {captionPosition === position
                ? (<CustomizeCaption />)
                : (
                  <Checkbox onChange={() => {
                    changeCaptionPosition(position)

                    historyStore.recordEvent({
                      id: nanoid(),
                      tab: 2,
                      type: "changeCaptionPosition",
                      value: position,
                    })
                  }}
                  />
                )}
            </CheckboxInner>
          ))}
        </CheckboxWrapper>
      ))}
    </>
  )
})
