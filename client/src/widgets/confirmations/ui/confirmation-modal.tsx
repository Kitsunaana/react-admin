import Button from "@mui/material/Button"
import { isString } from "shared/lib/utils"
import { Modal } from "shared/ui/modal"
import { Text } from "shared/ui/text"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { defaultConfirmationParams } from "../constants"
import { ConfirmationModalParams } from "../model/types"
import { Mark } from "shared/ui/mark"

interface ConfirmationModalProps {
  params: ConfirmationModalParams
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { params } = props

  useKeyboard({
    key: "Escape",
    callback: params.onClose,
  })

  useKeyboard({
    key: "Enter",
    callback: params.onConfirm,
  })

  const getLangBase = (property: keyof ConfirmationModalParams) => (
    params[property] !== defaultConfirmationParams[property]
      ? params.langBase
      : defaultConfirmationParams.langBase
  )

  return (
    <Modal isOpen onClose={params.onClose}>
      <Modal.Header>
        <Text
          name={params.title}
          langBase={getLangBase("title")}
        />
      </Modal.Header>
      <Modal.Body>
        {
          isString(params.description)
            ? (
              <Text
                name={params.description}
                langBase={getLangBase("description")}
              />
            )
            : params.description
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          sx={{ borderRadius: 2, display: "flex", gap: 1 }}
          onClick={params.onConfirm}
          color="primary"
          variant="contained"
          size="small"
        >
          <Text
            name={params.confirmText}
            langBase={getLangBase("confirmText")}
          />
          <Mark style={{ fontSize: 10, textTransform: "capitalize" }}>Enter</Mark>
        </Button>
        <Button
          sx={{ borderRadius: 2, display: "flex", gap: 1 }}
          onClick={params.onClose}
          color="warning"
          variant="contained"
          size="small"
        >
          <Text
            name={params.closeText}
            langBase={getLangBase("closeText")}
          />
          <Mark style={{ fontSize: 10, textTransform: "capitalize" }}>Escape</Mark>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
