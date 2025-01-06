import { RowItem } from "shared/ui/row-item"
import styled from "styled-components"

export const CustomRowItem = styled(RowItem)`
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
