import Button from "@mui/material/Button"
import { useEvent } from "shared/hooks/use-event"
import { isString } from "shared/lib/utils"
import { Modal } from "shared/ui/modal"
import { Text } from "shared/ui/text"
import { defaultConfirmationParams } from "../constants"
import { ConfirmationModalParams } from "../model/types"

interface ConfirmationModalProps {
  params: ConfirmationModalParams
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { params } = props

  useEvent("keydown", (event) => {
    if (event.key === "Enter") params.onConfirm()
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
          sx={{ borderRadius: 2 }}
          onClick={params.onConfirm}
          color="primary"
          variant="contained"
          size="small"
        >
          <Text
            name={params.confirmText}
            langBase={getLangBase("confirmText")}
          />
        </Button>
        <Button
          sx={{ borderRadius: 2 }}
          onClick={params.onClose}
          color="warning"
          variant="contained"
          size="small"
        >
          <Text
            name={params.closeText}
            langBase={getLangBase("closeText")}
          />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
