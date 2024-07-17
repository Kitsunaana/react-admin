import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "app/providers/Store"
import { MutableRefObject } from "react"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

interface ListenForOutsideClicksProps {
  listening: boolean
  setListening: (listening: boolean) => void
  setIsOpen: (open: boolean) => void
  menuRef: MutableRefObject<null | HTMLElement>
}

export const listenForOutsideClicks = (props: ListenForOutsideClicksProps) => {
  const {
    menuRef, setIsOpen, setListening, listening,
  } = props

  return () => {
    if (listening) return
    if (!menuRef.current) return

    setListening(true);

    ["click", "touchstart"].forEach((type) => {
      document.addEventListener("click", (event) => {
        const { current } = menuRef
        const node = event.target as unknown as Node

        if (node === null) return

        if (current?.contains(node)) return

        setIsOpen(false)
      })
    })
  }
}
