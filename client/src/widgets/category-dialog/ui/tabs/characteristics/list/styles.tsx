import { styled } from "@mui/material/styles"
import { forwardRef } from "react"
import { Box, BoxProps } from "shared/ui/box"

export const CharacteristicsContainer = styled(
  forwardRef((props: BoxProps, ref) => <Box {...props} ref={ref} />),
)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
}))
