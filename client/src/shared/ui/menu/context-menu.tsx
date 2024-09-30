import { forwardRef, ReactNode } from "react"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { styled } from "@mui/material/styles"

const Menu = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 10,
  position: "absolute",
  padding: "8px 0px",
  borderRadius: 12,
  backgroundImage: theme.background.sectionBackground,
  boxShadow: theme.shadows["6"],
  backgroundColor: theme.palette.mode === "dark"
    ? theme.palette.grey["900"]
    : "white",
}))

interface CategoryContextMenuProps {
  id?: number
  actionsList?: ReactNode
}

export const ContextMenu = forwardRef<
  HTMLDivElement | null, CategoryContextMenuProps
>((props, ref) => {
  const { id, actionsList } = props

  return (
    <Menu ref={ref}>
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
    </Menu>
  )
})
