import { styled } from "@mui/material/styles"
import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"

type MarkEventWrapperProps = {
  color: string
  showLine?: boolean
}

export const MarkEventWrapper = styled("div")<MarkEventWrapperProps>(({ showLine, theme }) => ({
  position: "relative",
  ...(showLine ? {
    "&::after": {
      content: "''",
      position: "absolute",
      width: "calc(100% + 8px)",
      height: 2,
      backgroundColor: theme.palette.error.light,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  } : {}),
}))

export const StyledMark = styled(Mark)(() => ({
  display: "block",
  fontSize: 12,
  maxWidth: 200,
  textWrap: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100%",
}))

export const StyledTemplateEvent = styled(RowItem)(() => ({
  cursor: "pointer",
  padding: "2px 6px",
  minHeight: 30,
}))

export const TemplateEventContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}))

export const TemplateEventText = styled(Text)(() => ({
  fontSize: 12,
}))

export const TemplateDifferedEventContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: 12,
}))
