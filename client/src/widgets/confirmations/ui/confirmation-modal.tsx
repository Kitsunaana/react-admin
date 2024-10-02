import { useEvent } from "shared/hooks/use-event"
import { Modal } from "shared/ui/modal"
import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import { ConfirmationModalParams } from "../model/types"

interface ConfirmationModalProps {
  params: ConfirmationModalParams
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { params } = props

  useEvent("keydown", (event) => {
    if (event.key === "Enter") params.onConfirm()
  })

  return (
    <Modal isOpen onClose={params.onClose}>
      <Modal.Header><Text caption={params.title} /></Modal.Header>
      <Modal.Body><Text caption={params.description} /></Modal.Body>
      <Modal.Footer>
        <Button onClick={params.onClose}>{params.closeText}</Button>
        <Button onClick={params.onConfirm}>{params.confirmText}</Button>
      </Modal.Footer>
    </Modal>
  )
}
