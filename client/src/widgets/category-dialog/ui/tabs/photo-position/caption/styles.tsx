import { styled } from "@mui/material/styles"
import { Text, TextProps } from "shared/ui/text"

type CaptionViewProps = TextProps & {
  color: string
  bgColor: string
  blur: number
}

export const CaptionView = styled(
  ({
    color, bgColor, blur, ...other
  }: CaptionViewProps) => <Text {...other} />,
)(({ color, bgColor, blur }) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  fontSize: 20,
  lineHeight: 1.5,
  color,
  whiteSpace: "pre-line",
  padding: "4px 8px",
  background: bgColor,
  borderRadius: "8px",
  boxShadow: `${bgColor} 0px 4px 15px`,
  backdropFilter: `blur(${blur}px)`,
  border: "1px solid rgba(255, 255, 255, 0.12)",
}))
