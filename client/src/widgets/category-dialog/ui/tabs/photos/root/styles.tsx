import { styled } from "@mui/material/styles"
import { Box } from "shared/ui/box"
import { DetailedHTMLProps, HTMLAttributes } from "react"

export const Container = styled("div")(() => ({
  marginTop: 8,
  height: "100%",
}))

export const GridImage = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridTemplateRows: 170,
  gap: 8,
}))

type GridImageContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  fullscreen: boolean
}

export const GridImageContainer = styled(
  ({ fullscreen, ...other }: GridImageContainerProps) => <div {...other} />,
)(({ fullscreen }) => ({
  height: "100%",
  overflow: "auto",
  maxHeight: fullscreen ? "calc(100vh - 190px)" : "calc(450px - 90px)",
  marginTop: 8,
}))
