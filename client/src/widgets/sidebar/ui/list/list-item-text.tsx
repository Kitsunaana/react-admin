import { ListItemTextProps as MUIListItemTextProps } from "@mui/material/ListItemText/ListItemText"
import { memo } from "react"
import { Text } from "shared/ui/text"

interface ListItemTextProps extends MUIListItemTextProps {
  disabled: boolean
  name: string
}

export const ListItemText = memo((props: ListItemTextProps) => {
  const { disabled, name } = props

  return (
    <Text
      sx={{
        color: ({ palette }) => (disabled ? palette.text.disabled : null),
        width: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      name={name}
      langBase="sidebar"
    />
  )
})
