import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import * as React from "react"
import { Box, ButtonBase, BoxProps } from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo, ReactNode } from "react"

interface ContainerExpandButtonProps extends BoxProps {
  open: boolean
}

export const ContainerExpandButton = styled((props: ContainerExpandButtonProps) => {
  const { open } = props
  return (

      <Box {...props} />
  )
})`
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: .3s;
    height: ${({ open }) => !open && "20px"};

    ::after, ::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 1px;
        top: 50%;
        transform: translate(0, -50%);
        background-color: ${({ theme, open }) => (open ? "transparent" : theme.palette.grey["300"])};
    }

    ::after {
        left: -5px;
    }

    ::before {
        right: -5px;
    }
`

export interface SidebarExpandButtonProps {
  open: boolean
  onToggleExpand: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isExpanded: boolean
}

export const SidebarExpandButton = memo((props: SidebarExpandButtonProps) => {
  const { onToggleExpand, isExpanded, open } = props

  return (
    <ButtonBase
      disableRipple={open}
      sx={{
        width: 1,
        ...(open ? { display: "flex", justifyContent: "end" } : {}),
      }}
    >
      <ContainerExpandButton open={open} onClick={onToggleExpand}>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 18,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: ".3s",
          }}
        />
      </ContainerExpandButton>
    </ButtonBase>
  )
})
