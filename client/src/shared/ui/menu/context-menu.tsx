import { styled } from "@mui/material/styles"
import { forwardRef, ReactNode } from "react"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"

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
  id?: string
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
          sx={{
            fontSize: 12,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          caption={(
            <>
              ID
              <Mark
                style={{
                  marginLeft: 4,
                  maxWidth: 100,
                  display: "block",
                  textWrap: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {id}
              </Mark>
            </>
          )}
        />
      )}
    </Menu>
  )
})
