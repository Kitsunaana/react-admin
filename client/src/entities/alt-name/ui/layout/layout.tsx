import { memo, ReactNode } from "react"
import { LangContext } from "shared/context/lang"
import { StyledAltNameItem } from "./styles"

export const Layout = memo(({
  disabled,
  active,
  state,
  langBase,
  caption,
  actions,
}: {
  disabled: boolean
  active: boolean
  state: string
  langBase: string
  caption: ReactNode
  actions: ReactNode
}) => (
  <LangContext lang={langBase}>
    <StyledAltNameItem
      disabled={disabled}
      active={active}
      bgError={state === "error"}
      borderError={state === "error"}
      borderSuccess={state === "success"}
    >
      {caption}

      {actions}
    </StyledAltNameItem>
  </LangContext>
))
