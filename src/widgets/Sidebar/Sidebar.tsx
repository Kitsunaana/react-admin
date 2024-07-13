import { Box, Divider } from "@mui/material"
import * as React from "react"
import { ReactNode, useCallback, useState } from "react"
import { List } from "./ui/List"
import { menu } from "./constants"
import { MenuBurger } from "./ui/MenuBurger"

export type TSelected = { optionSelected: number | null; listSelected: number }

export type SidebarLayoutProps = {
  content: ReactNode
  header: ReactNode

  open: boolean
}

export const SidebarLayout = (props: SidebarLayoutProps) => {
  const {
    content,
    header,
    open,
  } = props

  return (
    <Box sx={{
      width: 1,
      height: 1,
      maxWidth: open ? 240 : 47,
      boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
      background: ({ background }) => background.sectionBackground,
      borderRadius: 2,
      transition: ".3s",
      overflow: "hidden",
    }}
    >
      <Box sx={{
        maxWidth: 47,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        {header}
      </Box>
      <Divider />
      {content}
    </Box>
  )
}

export const SidebarContent = ({ open }: { open: boolean }) => {
  const [selected, setSelected] = useState<TSelected>({
    optionSelected: null,
    listSelected: 0,
  })

  const handleOnSelect = useCallback((data: TSelected) => {
    setSelected((prevState) => {
      if (prevState.listSelected !== data.listSelected || prevState.optionSelected !== data.optionSelected) {
        return { ...prevState, ...data }
      }

      return prevState
    })
  }, [])

  return menu.map((list) => {
    const findOption = list?.sublist?.find((option) => option.id === selected.optionSelected)

    return (
      <List
        key={list.id}
        list={list}
        isSelected={selected.listSelected === list.id}
        selectedOptionId={findOption ? findOption.id : false}
        onSelect={handleOnSelect}
        open={open}
      />
    )
  })
}

export const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const handleOnToggle = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <SidebarLayout
      open={open}
      header={<MenuBurger open={open} onClick={handleOnToggle} />}
      content={<SidebarContent open={open} />}
    />
  )
}
