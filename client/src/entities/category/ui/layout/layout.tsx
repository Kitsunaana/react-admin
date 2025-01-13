import { LangContext, useLang } from "shared/context/lang"
import React, { memo, ReactNode } from "react"
import { CustomRowItem, ContainerActions } from "./styles"

export const Layout = memo(({
  caption,
  actions,
  contextMenu,
  contextButton,
  isOpen,
  open,
}: {
  caption: ReactNode
  actions: ReactNode
  contextMenu: ReactNode
  contextButton: ReactNode
  isOpen: boolean
  open: (event: React.MouseEvent<Element, MouseEvent>) => void
}) => {
  // const langBase = useLang("menuActions")
  const langBase = "catalog.rows.menuActions"

  return (
    <CustomRowItem
      bgColor={isOpen && "primary"}
      onContextMenu={open}
    >
      {caption}
      {isOpen && (
        <LangContext lang={langBase}>
          {contextMenu}
        </LangContext>
      )}
      <ContainerActions>
        {actions}
        {contextButton}
      </ContainerActions>
    </CustomRowItem>
  )
})
