import React, { forwardRef, ReactNode } from "react"
import { Backdrop } from "@mui/material"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"

interface CategoryContextMenuProps {
  id?: number
  actionsList?: ReactNode
}

export const ContextMenu = forwardRef<
  HTMLDivElement | null, CategoryContextMenuProps
>((props, ref) => {
  const { id, actionsList } = props

  return (
    <Box
      ref={ref}
      flex
      sx={{
        zIndex: 10,
        position: "absolute",
        py: 1,
        borderRadius: 3,
        backgroundColor: ({ palette }) => (palette.mode === "dark"
          ? palette.grey["900"]
          : "white"),
        backgroundImage: ({ background }) => background.sectionBackground,
        boxShadow: ({ shadows }) => shadows["6"],
      }}
    >
      {actionsList}
      {id && (
        <Text
          sx={{ fontSize: 12, textAlign: "center" }}
          caption={(
            <>
              ID
              <Mark style={{ marginLeft: 4 }}>{id}</Mark>
            </>
          )}
        />
      )}
    </Box>
  )
})
