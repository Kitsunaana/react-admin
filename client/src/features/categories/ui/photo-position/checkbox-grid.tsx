import { Checkbox } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Box, BoxProps } from "shared/ui/box"
import { styled } from "@mui/material/styles"
import { GRID_CHECKBOX } from "../../model/const"
import { useCategoryStores } from "../../model/context"
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
  const { photoPosition } = useCategoryStores()
  const { captionPosition, changeCaptionPosition } = photoPosition

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
                : (<Checkbox onChange={() => changeCaptionPosition(position)} />)}
            </CheckboxInner>
          ))}
        </CheckboxWrapper>
      ))}
    </>
  )
})
