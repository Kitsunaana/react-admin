import { useEvent } from "shared/hooks/use-event"
import { Modal } from "shared/ui/modal"
import Button from "@mui/material/Button"
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
      <Modal.Header>{params.title}</Modal.Header>
      <Modal.Body>{params.description}</Modal.Body>
      <Modal.Footer>
        <Button
          sx={{ borderRadius: 2 }}
          onClick={params.onClose}
          color="primary"
          variant="contained"
          size="small"
        >
          {params.closeText}
        </Button>
        <Button
          sx={{ borderRadius: 2 }}
          onClick={params.onConfirm}
          color="warning"
          variant="contained"
          size="small"
        >
          {params.confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
