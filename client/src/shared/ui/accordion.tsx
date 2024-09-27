import AccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import { Box } from "shared/ui/box"
import {
  Accordion as MUIAccordion, AccordionProps as MUIAccordionProps, IconButton, Theme, useTheme,
} from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Divider, Vertical } from "shared/ui/divider"
import AccordionDetails from "@mui/material/AccordionDetails"
import React, {
  ReactNode, useState,
} from "react"
import styled from "styled-components"

export const AccordionContainer = styled(MUIAccordion)`
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
    border: ${({ theme }) => `1px solid ${theme.palette.grey["700"]}`};
    background-image: ${({ theme }) => `${theme.background.sectionBackground} !important`};
    
    &.Mui-expanded {
        margin-top: ${({ theme }) => `${theme.spacing(0.5)} !important`};
        margin-bottom: ${({ theme }) => `${theme.spacing(0.5)} !important`};
        border-radius: ${({ theme }) => theme.spacing(1)};
    }

    &:first-of-type {
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;;
    }
`

export const Summary = styled(AccordionSummary)<AccordionSummaryProps & { theme: Theme }>`
    padding-left: ${({ theme }) => `${theme.spacing(1)} !important`};
    padding-right: ${({ theme }) => `${theme.spacing(1)} !important`};
    
    & .MuiAccordionSummary-content {
        margin-top: 0;
        margin-bottom: 0;

        padding-top: ${({ theme }) => theme.spacing(0.5)};
        padding-bottom: ${({ theme }) => theme.spacing(0.5)};
        
        &.Mui-expanded {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    &.Mui-expanded {
        min-height: unset !important;
    }
`

export type AccordionProps = {
  caption?: ReactNode
  description?: ReactNode
  tags?: ReactNode
  actions?: ReactNode
  contentTitle?: ReactNode | string
  details?: ReactNode
  expanded?: boolean
  children?: ReactNode
} & MUIAccordionProps

export const Accordion = (props: AccordionProps) => {
  const {
    caption, description, children, tags, actions, contentTitle, details, ...other
  } = props

  const theme = useTheme()
  const [isExpanded, setIdExpanded] = useState(false)

  return (
    <AccordionContainer
      theme={theme}
      {...other}
      expanded={isExpanded}
      onClick={() => setIdExpanded((prevState) => !prevState)}
    >
      <Summary theme={theme}>
        <Box flex row jc_sp ai sx={{ width: 1 }}>
          <Box>
            {caption}
            {description}
          </Box>
          <Box flex ai row sx={{ height: 1 }} onClick={(event) => event.stopPropagation()}>
            {tags}
            {actions}
            <Vertical sx={{ mx: 0.75 }} />
            <IconButton
              sx={{
                p: 0.5,
                transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                transition: ".3s",
              }}
              onClick={() => setIdExpanded((prevState) => !prevState)}
            >
              <Icon sx={{ fontSize: 20 }} name="expand" />
            </IconButton>
          </Box>
        </Box>
      </Summary>
      <AccordionDetails>
        <Divider textAlign="right">{contentTitle}</Divider>
        {details}
      </AccordionDetails>
    </AccordionContainer>
  )
}

interface AccordionPropsV2 extends MUIAccordionProps{
  summary?: ReactNode
  details?: ReactNode
  onOpenContextMenu: (event: React.MouseEvent<Element, MouseEvent>) => void
}

export const AccordionV2 = (props: AccordionPropsV2) => {
  const {
    summary, details, onOpenContextMenu, ...other
  } = props

  const theme = useTheme()
  const [isExpanded, setIdExpanded] = useState(false)

  return (
    <AccordionContainer
      {...other}
      theme={theme}
      expanded={isExpanded}
      onClick={(event) => {
        setIdExpanded((prevState) => !prevState)
        onOpenContextMenu(event)
      }}
    >
      <Summary
        theme={theme}
      >
        {summary}
      </Summary>
      <AccordionDetails>
        {details}
      </AccordionDetails>
    </AccordionContainer>
  )
}
