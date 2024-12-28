import { RowItem, RowItemProps } from "shared/ui/row-item"
import { styled } from "@mui/material/styles"

interface StyledRowItemProps extends RowItemProps {
  active: boolean
  isCreatedOrUpdated: boolean
}

export const StyledRowItem = styled(
  ({ active, isCreatedOrUpdated, ...other }: StyledRowItemProps) => <RowItem {...other} />,
)(({ active, isCreatedOrUpdated, theme: { palette } }) => ({
  ...(active ? {
    border: (
      `1px solid ${palette.mode === "light" ? palette.primary.light : palette.warning.dark}`
    ),
    ...(isCreatedOrUpdated ? {
      borderLeft: (
        `5px solid ${palette.mode === "light" ? palette.primary.light : palette.warning.dark}`
      ),
    } : {}),
  } : {}),
}))
