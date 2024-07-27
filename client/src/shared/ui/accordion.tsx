import AccordionSummary from "@mui/material/AccordionSummary"
import { Box } from "shared/ui/box"
import { Accordion as MUIAccordion, IconButton } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Divider, Vertical } from "shared/ui/divider"
import AccordionDetails from "@mui/material/AccordionDetails"
import React, {
  forwardRef, ReactNode, useCallback, useState,
} from "react"

export type AccordionProps = {
  caption?: ReactNode
  description?: ReactNode
  tags?: ReactNode
  actions?: ReactNode
  contentTitle?: ReactNode | string
  details?: ReactNode
  expanded?: boolean
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    caption, description, tags, actions, contentTitle, details,
  } = props

  return (
    <MUIAccordion
      ref={ref}
      sx={{
        border: ({ palette }) => `1px solid ${palette.grey["600"]}`,
        backgroundImage: ({ background }) => background.sectionBackground,
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
        "&.Mui-expanded": {
          my: 1,
          borderRadius: 1,
        },
      }}
    >
      <AccordionSummary
        sx={{
          px: 1,
          "& .MuiAccordionSummary-content": {
            my: 0,
            py: 0.5,

            "&.Mui-expanded": {
              my: 0,
            },
          },
          "&.Mui-expanded": {
            minHeight: "unset",
          },
        }}
      >
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
      </AccordionSummary>
      <AccordionDetails>
        <Divider textAlign="right">{contentTitle}</Divider>
        {details}
      </AccordionDetails>
    </MUIAccordion>
  )
})
