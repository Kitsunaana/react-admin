import { alpha, ButtonBase, ButtonBaseProps } from "@mui/material"
import { styled } from "@mui/material/styles"

type VariantThemeButtonProps = ButtonBaseProps & {
  isActive: boolean
}

export const VariantThemeButton = styled(
  ({ isActive, ...other }: VariantThemeButtonProps) => <ButtonBase {...other} />,
)(({ isActive, theme }) => {
  const isLight = theme.palette.mode === "light"

  return {
    fontSize: 16,
    userSelect: "none",
    textTransform: "uppercase",
    borderRadius: 8,
    padding: "8px 8px 2px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    "&:hover": {
      transition: ".2s",
      backgroundColor: isLight
        ? theme.palette.grey["100"]
        : alpha(theme.palette.common.white, 0.06),
    },
    backgroundColor: isActive
      ? (isLight ? theme.palette.grey["300"] : alpha(theme.palette.common.white, 0.16))
      : undefined,
  }
})

export const WrapperButtons = styled("div")(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.grey["400"], theme.palette.mode === "light" ? 1 : 0.5)}`,
  padding: 4,
  display: "inline-flex",
  borderRadius: 12,
  gap: 4,
  marginTop: 8,
}))
