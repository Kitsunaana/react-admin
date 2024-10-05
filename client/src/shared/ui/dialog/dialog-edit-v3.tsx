import { DialogProps as MUIDialogProps } from "@mui/material/Dialog/Dialog"
import { FC, ReactNode, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { observer } from "mobx-react-lite"
import { Dialog as MUIDialog } from "@mui/material"
import { Box } from "shared/ui/box"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import styled, { css } from "styled-components"
import { Skeleton } from "shared/ui/skeleton"
import { DialogStore } from "shared/ui/dialog/model/dialog-store"

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
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  align-self: flex-end;
  padding: 8px;
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
    title,
    height,
    size,
    tabs,
    container,
    header,
    isLoading,
    handleSubmit,
    store,
    close,
    ...other
  } = props

  const methods = useFormContext()

  useEffect(() => { if (close) store.closeDialog() }, [close])

  const onClose = () => store.closeDialog()
  const onSubmit = () => methods.handleSubmit(handleSubmit)()

  return (
    <DialogWrapper
      open={store.open}
      fullScreen={store.fullScreen}
      size={size ?? "auto"}
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
          <Box sx={{ px: 1, height: 1 }}>
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
        <SaveButton
          onClick={onSubmit}
          disabled={isLoading}
        />
        <CancelButton
          onClick={onClose}
          disabled={isLoading}
        />
      </ButtonContainer>
    </DialogWrapper>
  )
})
