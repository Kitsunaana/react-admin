import { ReactNode } from "react"

export type ConfirmationModalParams = {
  title: string
  description: string | ReactNode
  closeText: string
  confirmText: string
  langBase: string
  onClose: () => void
  onConfirm: () => void
}
