import AccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary"
import {
  Accordion as MUIAccordion, AccordionProps as MUIAccordionProps, accordionClasses,
} from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import React, { ReactNode, useState } from "react"
import { styled } from "@mui/material/styles"

export const AccordionContainer = styled(MUIAccordion)(({ theme }) => ({
  boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  border: `1px solid ${theme.palette.grey[700]}`,
  backgroundImage: theme.background.sectionBackground,

  [`&.${accordionClasses.expanded}`]: {
    margin: "4px 0px",
    borderRadius: 8,
  },

  "&:first-of-type": {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  "&:last-child": {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}))

export const Summary = styled(AccordionSummary)(() => ({
  padding: "0px 8px",

  [`& .${accordionSummaryClasses.content}`]: {
    margin: "0px",
    padding: "4px 0px",

    [`&.${accordionSummaryClasses.expanded}`]: {
      margin: "0px",
    },
  },

  [`&.${accordionSummaryClasses.expanded}`]: {
    minHeight: "unset !important",
  },
}))

interface AccordionPropsV2 extends MUIAccordionProps{
  summary?: ReactNode
  details?: ReactNode
  onOpenContextMenu: (event: React.MouseEvent<Element, MouseEvent>) => void
}

export const AccordionV2 = (props: AccordionPropsV2) => {
  const {
    summary,
    details,
    onOpenContextMenu,
    ...other
  } = props

  const [isExpanded, setIdExpanded] = useState(false)

  return (
    <AccordionContainer
      {...other}
      expanded={isExpanded}
      onClick={(event) => {
        setIdExpanded((prevState) => !prevState)
        onOpenContextMenu(event)
      }}
    >
      <Summary>{summary}</Summary>
      <AccordionDetails>
        s
        {details}
      </AccordionDetails>
    </AccordionContainer>
  )
}
