import {
  alpha,
  MenuItem,
  MenuItemProps,
} from "@mui/material"

export const SelectItem = (props: MenuItemProps) => {
  const { sx, children, ...other } = props

  return (
    <MenuItem
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        mx: 1,
        my: 0.75,
        px: "4px !important",
        py: "4px !important",
        display: "flex",
        justifyContent: "space-between !important",
        alignItems: "center",
        borderRadius: 1.5,
        border: "1px solid transparent",
        transition: ".2s",
        "&:hover": {
          backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
          border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
        },

        "&[aria-selected='true']": {
          backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
          border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </MenuItem>
  )
}
