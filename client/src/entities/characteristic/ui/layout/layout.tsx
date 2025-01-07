import React, { memo, ReactNode } from "react"
import { LangContext } from "shared/context/lang"
import { StyledRowItem } from "shared/ui/row-item"

export const Layout = memo(({
  active,
  state,
  langBase,
  infoView,
  actions,
  onDoubleClick,
}: {
  active: boolean
  state: string
  langBase: string
  infoView: ReactNode
  actions: ReactNode
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => (
  <LangContext lang={langBase}>
    <StyledRowItem
      active={active}
      borderSuccess={state === "success"}
      borderError={state === "error"}
      bgError={state === "error"}
      onDoubleClick={onDoubleClick}
    >
      {infoView}
      {actions}
    </StyledRowItem>
  </LangContext>
))
