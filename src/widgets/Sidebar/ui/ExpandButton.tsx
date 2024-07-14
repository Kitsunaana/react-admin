import {
  ButtonBase, ButtonBaseProps, Tooltip,
} from "@mui/material"
import * as React from "react"
import { memo, MouseEvent } from "react"
import { Box } from "shared/ui/Box"
import { Icon } from "shared/ui/Icon"

interface ExpandButtonProps {
  handleOnExpand: (event: MouseEvent<HTMLButtonElement>) => void
  isExpanded: boolean
  buttonProps?: ButtonBaseProps
  divider?: boolean
  tooltipCaption?: string
}

export const ExpandButton = memo((props: ExpandButtonProps) => {
  const {
    handleOnExpand, isExpanded, buttonProps, divider, tooltipCaption,
  } = props

  const renderButton = (
    <ButtonBase
      onClick={handleOnExpand}
      sx={{
        width: 1,
        "&:hover": {
          backgroundColor: ({ palette }) => palette.grey["100"],
          transition: ".3s",
        },
        ...buttonProps?.sx,
      }}
      {...buttonProps}
    >
      <Box sx={{
        height: divider ? 20 : 35,
        ...(divider ? {
          position: "relative",
          "&::after, &::before": {
            content: "''",
            position: "absolute",
            width: 1,
            height: "1px",
            top: "50%",
            transform: "translate(0, -50%)",
            backgroundColor: ({ palette }) => palette.grey["300"],
          },
          "&::after": {
            right: -28,
          },
          "&::before": {
            left: -28,
          },
        } : {}),
      }}
      >
        <Icon
          name="expand"
          sx={{
            fontSize: 18,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: ".3s !important",
            width: 35,
            height: 1,
            display: "grid",
            placeItems: "center",
          }}
        />
      </Box>
    </ButtonBase>
  )

  if (divider) {
    return (
      <Tooltip
        placement="right"
        arrow
        title={isExpanded ? `Свернуть маршруты ${tooltipCaption}` : `Развернуть маршруты ${tooltipCaption}`}
      >
        {renderButton}
      </Tooltip>
    )
  }

  return renderButton
})
