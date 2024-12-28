import { useModalStore } from "shared/hooks/use-modal-store"
import { ConfirmationParams, useGetConfirmation } from "shared/lib/confirmation"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/handlers"
import { isBoolean } from "shared/lib/utils"

const DEFAULT_CONFIRM_CANCEL = {
  closeText: "cancel",
  confirmText: "close",
  description: "descriptionClose",
  langBase: "global.dialog.confirm.close",
}

const DEFAULT_CONFIRM_SUBMIT = {
  closeText: "cancel",
  confirmText: "save",
  description: "descriptionSave",
  langBase: "global.dialog.confirm.save",
}

type UseModalKeyboardManageOptions = {
  cancel?: () => void,
  submit?: () => void,
  confirmCancel?: boolean | ConfirmationParams
  confirmSubmit?: boolean | ConfirmationParams
}

export const useModalKeyboardManage = (options: UseModalKeyboardManageOptions) => {
  const {
    confirmCancel,
    confirmSubmit,
    cancel,
    submit,
  } = options

  const changeTab = useModalStore((store) => store.changeTab)
  const tab = useModalStore((store) => store.tab)

  const getConfirmation = useGetConfirmation()

  useKeyboard({
    key: "Escape",
    callback: async () => {
      if (!confirmCancel) return cancel?.()

      const confirmation = await getConfirmation(
        isBoolean(confirmCancel) ? DEFAULT_CONFIRM_CANCEL : confirmCancel,
      )

      if (confirmation) cancel?.()
    },
  })

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(async (event) => {
      console.log(event.ctrlKey, event.key)
      if (!confirmSubmit) {
        console.log("confirmSubmit", submit)
        return submit?.()
      }
      console.log("confirmSubmit", confirmSubmit)

      const confirmation = await getConfirmation(
        isBoolean(confirmSubmit) ? DEFAULT_CONFIRM_SUBMIT : confirmSubmit,
      )

      if (confirmation) submit?.()
    }),
  })

  useKeyboard({
    key: "ArrowRight",
    callback: altCtrlKey(() => changeTab(Math.min(tab + 1, 5))),
  })

  useKeyboard({
    key: "ArrowLeft",
    callback: altCtrlKey(() => changeTab(Math.max(0, tab - 1))),
  })
}
