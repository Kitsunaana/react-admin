import { styled } from "@mui/material/styles"
import { Box, BoxProps } from "shared/ui/box"

export const CheckboxWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "33.3333%",
}))

interface CheckboxInnerProps extends BoxProps {
  content: string
}

export const CheckboxInner = styled(
  ({ content, ...other }: CheckboxInnerProps) => <Box {...other} />,
)(({ content }) => ({
  display: "flex",
  flexBasis: "33.3333%",
  justifyContent: content,
}))
