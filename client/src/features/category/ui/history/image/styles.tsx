import { styled } from "@mui/material/styles"
import { Text } from "shared/ui/text"

export const ImageEventContainer = styled("div")(() => ({
  display: "flex",
  gap: 8,
  alignItems: "center",
  fontSize: 12,
}))

export const ImageEventsBox = styled("div")(() => ({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 2,
}))

export const TemplateEventText = styled(Text)(() => ({
  fontSize: 12,
}))
