import { forwardRef } from "react"
import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"

interface CharacteristicsContainerProps extends BoxProps {
  fullscreen: boolean
}

export const CharacteristicsContainer = styled(
  ({ fullscreen, ...other }: CharacteristicsContainerProps) => <Box {...other} />,
)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
  height: ${({ fullscreen }) => (fullscreen ? "calc(100% - 60px)" : "432px")};
`

type AltNamesContainerProps = BoxProps & { fullscreen: boolean }

export const AltNamesContainer = styled(
  forwardRef(({ fullscreen, ...other }: AltNamesContainerProps, ref) => (
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
