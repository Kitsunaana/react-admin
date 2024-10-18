import {
  alpha,
  ButtonBase, ButtonBaseProps, Tooltip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo, MouseEvent } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

interface ExpandButtonProps {
  handleOnExpand: (event: MouseEvent<HTMLButtonElement>) => void
  isExpanded: boolean
  buttonProps?: ButtonBaseProps
  divider?: boolean
  name: string
  open: boolean
}

interface ButtonProps extends ButtonBaseProps {
  open: boolean
}

const Button = styled(
  ({ open, ...other }: ButtonProps) => <ButtonBase {...other} />,
)(({ theme: { palette }, open }) => ({
  width: "100%",
  ...(open ? {} : {
    "&:hover": {
      transition: ".3s",
      backgroundColor: (
        (palette.mode === "light")
          ? palette.grey["100"]
          : alpha(palette.common.white, 0.1)
      ),
    },
  }),
}))

interface IconContainerProps extends BoxProps {
  divider?: boolean
}

const IconContainer = styled(
  ({ divider, ...other }: IconContainerProps) => <Box {...other} />,
)(({ divider, theme }) => ({
  height: divider ? 20 : 35,

  ...(divider ? {
    position: "relative",

    "&::after, &::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "1px",
      top: "50%",
      transform: "translate(0, -50%)",
      backgroundColor: theme.palette.grey["300"],
    },

    "&::after": {
      right: -28,
    },

    "&::before": {
      left: -28,
    },
  } : {}),
}))

export const ExpandButton = memo((props: ExpandButtonProps) => {
  const {
    handleOnExpand,
    isExpanded,
    buttonProps,
    divider,
    name,
    open,
  } = props

  const renderButton = (
    <Button
      open={open}
      onClick={handleOnExpand}
      {...buttonProps}
    >
      <IconContainer divider={divider}>
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
      </IconContainer>
    </Button>
  )

  if (divider) {
    return (
      <Tooltip
        placement="right"
        arrow
        title={(
          <>
            <Text onlyText name={`${isExpanded ? "collapse" : "expand"}Routes`} />
            {" "}
            <Text onlyText name={name} />
          </>
        )}
      >
        {renderButton}
      </Tooltip>
    )
  }

  return renderButton
})
