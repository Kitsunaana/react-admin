import { RowItem } from "shared/ui/row-item"
import { styled } from "@mui/material/styles"
import styledV2 from "styled-components"

export const CustomRowItem = styledV2(RowItem)`
  && {
    margin-bottom: 0px;
    min-height: 48px;
    border-radius: 0px;
    gap: 10px;

    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &:first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
`

export const ContainerActions = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}))
