import { styled } from "@mui/material/styles"
import { forwardRef } from "react"
import { Box, BoxProps } from "shared/ui/box"

type CharacteristicsContainerProps = BoxProps & { fullscreen: boolean }

export const CharacteristicsContainer = styled(
  forwardRef(({ fullscreen, ...other }: CharacteristicsContainerProps, ref) => (
    <Box {...other} ref={ref} />
  )),
)(({ fullscreen }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
  height: fullscreen ? "calc(100% - 60px)" : "400px",
}))
