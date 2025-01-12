import { ConfirmationModalParams } from "./model/types"

export const defaultConfirmationParams: ConfirmationModalParams = {
  title: "title",
  description: "description",
  closeText: "closeText",
  confirmText: "confirmText",
  langBase: "global.confirm",
  onClose: () => { },
  onConfirm: () => { },
}
