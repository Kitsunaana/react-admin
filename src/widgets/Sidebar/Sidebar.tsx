import { Box, Divider } from "@mui/material"
import * as React from "react"
import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from "react"
import { List } from "./ui/List"
import { menu } from "./constants"
import { MenuBurger } from "./ui/MenuBurger"
import { MenuList } from "./types"
import { addEvent } from "../../shared/lib/event"

export type TSelected = { optionSelected: number | null; listSelected: number; menu?: MenuList[] }

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
    /* setSelected((prevState) => {
      if (prevState.listSelected !== data.listSelected || prevState.optionSelected !== data.optionSelected) {
        return { ...prevState, ...data }
      }

      console.log(123)
      return prevState
    }) */

  }, [])

  useEffect(() => {
    addEvent("selected", (data: { selectedId: number; selectedOptionId: number | null }) => {
      // setSelected((prevState) => ({ ...prevState, optionSelected: data.selectedOptionId, listSelected: data.selectedId }))
    })
  }, [])

  /* useEffect(() => {
    addEvent("selected", ({ selectedId, selectedOptionId }: {
      selectedId: number
      selectedOptionId: number | null
    }) => {
      if (selected.optionSelected === selectedOptionId || selected.listSelected === selectedId) {
        return
      }

      setSelected((prevState) => ({ ...prevState, listSelected: selectedId, optionSelected: selectedOptionId }))
    })
  }, []) */

  return useMemo(() => menu.map((list) => {
    const findOption = list?.sublist?.find((option) => option.id === selected.optionSelected)

    return (
      <List
        key={list.id}
        list={list}
        // isSelected={selected.listSelected === list.id}
        // selectedOptionId={findOption ? findOption.id : false}
        onSelect={handleOnSelect}
        open={open}
      />
    )
  }), [selected.menu, selected.optionSelected, open])

  /* return selected.menu.map((list) => {
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
  }) */
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
