import { ListItemTextProps as MUIListItemTextProps } from "@mui/material/ListItemText/ListItemText"
import { memo } from "react"
import { Text } from "shared/ui/Text"
import * as React from "react"

interface ListItemTextProps extends MUIListItemTextProps {
  disabled: boolean
}

export const ListItemText = memo((props: { name: string } & ListItemTextProps) => {
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
