import AccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import { Box } from "shared/ui/box"
import {
  Accordion as MUIAccordion, IconButton, Theme, useTheme,
} from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Divider, Vertical } from "shared/ui/divider"
import AccordionDetails from "@mui/material/AccordionDetails"
import React, {
  forwardRef, ReactNode,
} from "react"
import styled from "styled-components"

export type AccordionProps = {
  caption?: ReactNode
  description?: ReactNode
  tags?: ReactNode
  actions?: ReactNode
  contentTitle?: ReactNode | string
  details?: ReactNode
  expanded?: boolean
}

export const Accordion = (props: AccordionProps) => {
  const {
    caption, description, tags, actions, contentTitle, details, ...other
  } = props

  const theme = useTheme()

  return (
    <AccordionContainer theme={theme} {...other}>
      <Summary theme={theme}>
        <Box flex row jc_sp ai sx={{ width: 1 }}>
          <Box>
            {caption}
            {description}
          </Box>
          <Box flex ai row sx={{ height: 1 }}>
            {tags}
            {actions}
            <Vertical sx={{ mx: 0.75 }} />
            <IconButton sx={{ p: 0.5 }}>
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

export const AccordionContainer = styled(MUIAccordion)`
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
    border: ${({ theme }) => `1px solid ${theme.palette.grey["600"]}`};
    background-image: ${({ theme }) => `${theme.background.sectionBackground} !important`};
    
    &.Mui-expanded {
        margin-top: ${({ theme }) => `${theme.spacing(0.5)} !important`};
        margin-bottom: ${({ theme }) => `${theme.spacing(0.5)} !important`};
        border-radius: ${({ theme }) => theme.spacing(0.5)};
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