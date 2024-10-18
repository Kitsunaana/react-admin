import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { MenuList } from "./types"

export type TRef = { selectedId: number | null; selectedOptionId: number | null }

const getSelectedParams = (pathname: string) => {
  const [selectedList, selectedOption] = pathname.replace("/", "").split("/")

  return {
    selectedList,
    selectedOption,
  }
}

const getSelectedIds = (pathname: string, list: MenuList) => {
  const { selectedList, selectedOption } = getSelectedParams(pathname)
  const findSelectedOption = list.sublist.find((option) => option.name === selectedOption)

  return {
    selectedId: selectedList === list.name ? list.id : null,
    selectedOptionId: findSelectedOption?.id ?? null,
  }
}

export const useListSelected = (list: MenuList) => {
  const location = useLocation()

  const { selectedList } = getSelectedParams(location.pathname)

  const [, setReload] = useState(true)
  const [isExpanded, setIsExpanded] = useState(selectedList === list.name)

  const ref = useRef<TRef>(getSelectedIds(location.pathname, list))

  useEffect(() => {
    if (list.name === selectedList) setIsExpanded(true)

    ref.current = getSelectedIds(location.pathname, list)

    setReload((prevState) => !prevState)
  }, [location.pathname])

  return {
    isExpanded,
    isSelected: ref.current.selectedId === list.id,
    selectedOptionId: ref.current.selectedOptionId,
    setIsExpanded,
  }
}
