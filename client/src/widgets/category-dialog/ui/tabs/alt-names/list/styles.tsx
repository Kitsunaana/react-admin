import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"
import { forwardRef } from "react"

export const AltNamesContainer = styled(
  forwardRef((props: BoxProps, ref) => (<Box {...props} ref={ref} />)),
)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
}))