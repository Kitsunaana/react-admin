import { Dialog as MUIDialog } from "@mui/material"
import { DialogProps as MUIDialogProps } from "@mui/material/Dialog/Dialog"
import { observer } from "mobx-react-lite"
import { FC, ReactNode, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { ConfirmationParams, useGetConfirmation } from "shared/lib/confirmation"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { isBoolean } from "shared/lib/utils"
import { DialogStore } from "shared/stores/dialog-store"
import { Box } from "shared/ui/box"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { SaveButton } from "shared/ui/dialog/save-button"
import { Skeleton } from "shared/ui/skeleton"
import styled, { css } from "styled-components"

interface DialogPropsV2 extends Omit<MUIDialogProps, "container" | "open"> {
  tabs?: ReactNode
  container?: ReactNode
  langBase?: string
  title?: string
  size?: "auto"
  height?: number | string
  header?: ReactNode
  isLoading: boolean
  handleSubmit: (data: any) => void
  store: DialogStore
  close?: boolean
  footer?: ReactNode
  onClose?: () => void
  onSave?: () => void
  confirmSave?: ConfirmationParams | boolean
  confirmClose?: ConfirmationParams | boolean
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  align-self: flex-end;
  padding: 8px;
  width: 100%;
`

interface DialogWrapperProps extends MUIDialogProps {
  fullScreen: boolean
  size: "auto" | number
}
const DialogWrapper = styled(({ size, ...other }: DialogWrapperProps) => <MUIDialog {...other} />)`
  & .MuiPaper-root {
    display: flex;
    border-radius: 16px;
    transition: .2s;
    
    ${({ fullScreen, size }) => (!fullScreen && css`
      max-width: 900px;
      width: 100%;
      height: ${typeof size === "number" ? `${size}px` : size};
      overflow: unset;
    `)}
  }
`

export const UpsertDialog: FC<DialogPropsV2> = observer((props) => {
  const {
    langBase: langBaseProps,
    handleSubmit,
    title,
    height,
    size,
    tabs,
    container,
    header,
    isLoading,
    store,
    close,
    footer,
    onClose,
    onSave,
    confirmClose,
    confirmSave,
    ...other
  } = props

  const methods = useFormContext()

  useEffect(() => { if (close) store.closeDialog() }, [close])

  const handleClose = () => {
    onClose?.()
    store.closeDialog()
  }

  const handleSave = () => {
    onSave?.()
    methods.handleSubmit(handleSubmit)()
  }

  const getConfirmation = useGetConfirmation()

  useKeyboard({
    key: "Enter",
    disabled: !store.open && !store.id,
    callback: async (event) => {
      if (event.ctrlKey && confirmSave) {
        const confirmation = await getConfirmation(isBoolean(confirmSave) ? {
          closeText: "cancel",
          confirmText: "save",
          description: "descriptionSave",
          langBase: "global.dialog.confirm.save",
        } : confirmSave)

        if (confirmation) handleSave()
      }
    },
  })

  useKeyboard({
    key: "Escape",
    disabled: !store.open,
    callback: async () => {
      if (confirmClose) {
        const confirmation = await getConfirmation(isBoolean(confirmClose) ? {
          closeText: "cancel",
          confirmText: "close",
          description: "descriptionClose",
          langBase: "global.dialog.confirm.close",
        } : confirmClose)

        if (confirmation) handleClose()
      }
    },
  })

  return (
    <DialogWrapper
      open={store.open}
      fullScreen={store.fullScreen}
      size={size ?? "auto"}
      disableEscapeKeyDown
      {...other}
    >
      <Box sx={{ mx: 1 }}>
        {isLoading ? (
          <Skeleton
            height={38}
            sx={{
              padding: 1,
              borderRadius: 2,
              margin: "8px 0px 4px",
              transformOrigin: "top",
              transform: "unset",
            }}
          />
        ) : (header)}
      </Box>

      <Box grow sx={{ height: height ?? 450, pt: 0 }}>
        <Box flex sx={{ height: 1 }}>
          {isLoading ? (
            <Skeleton
              width="100%"
              height={37}
              borderRadius={0}
            />
          ) : (tabs)}
          <Box sx={{ px: 1, height: 1, overflow: "hidden" }}>
            {isLoading ? (
              <Skeleton
                height="100%"
                width="100%"
                sx={{ margin: 0 }}
              />
            ) : (container)}
          </Box>
        </Box>
      </Box>
      <ButtonContainer>
        {footer}
        <Box flex row ai gap ml="auto" mr={0}>
          <SaveButton
            onClick={handleSave}
            disabled={isLoading}
          />
          <CancelButton
            onClick={handleClose}
            disabled={isLoading}
          />
        </Box>
      </ButtonContainer>
    </DialogWrapper>
  )
})
