import Button from "@mui/material/Button"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { isString } from "shared/lib/utils"
import { Mark } from "shared/ui/mark"
import { Modal } from "shared/ui/modal"
import { Text } from "shared/ui/text"
import { defaultConfirmationParams } from "../const"
import { ConfirmationModalParams } from "../model/types"

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
    callback: ({ ctrlKey }) => {
      if (ctrlKey) params.onConfirm()
    },
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
          <Mark style={{ fontSize: 10, textTransform: "capitalize" }}>Ctrl+Enter</Mark>
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
