import {
  FC, PropsWithChildren, useMemo, useState,
} from "react"
import { confirmationContext, ConfirmationParams } from "shared/lib/confirmation"
import { defaultConfirmationParams } from "../const"
import { ConfirmationModalParams } from "../model/types"
import { ConfirmationModal } from "./confirmation-modal"

export const Confirmations: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [modalParams, setModalParams] = useState<ConfirmationModalParams>()

  const closeConfirmation = () => modalParams?.onClose()

  const getConfirmation = (params: ConfirmationParams) => new Promise<boolean>((resolve) => {
    setModalParams({
      ...defaultConfirmationParams,
      ...params,
      onConfirm: () => {
        setModalParams(undefined)
        resolve(true)
      },
      onClose: () => {
        closeConfirmation()
        setModalParams(undefined)
        resolve(false)
      },
    })
  })

  const confirmationContextValue = useMemo(() => ({
    getConfirmation,
    closeConfirmation,
  }), [])

  return (
    <confirmationContext.Provider value={confirmationContextValue}>
      {children}

      {modalParams && <ConfirmationModal params={modalParams} />}
    </confirmationContext.Provider>
  )
}
