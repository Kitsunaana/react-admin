import { DialogProps as MUIDialogProps } from "@mui/material/Dialog/Dialog"
import {
  FC, ReactNode, useEffect,
} from "react"
import { DeepPartial, useFormContext } from "react-hook-form"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { Dialog as MUIDialog, Skeleton as MUIBaseSkeleton, SkeletonProps } from "@mui/material"
import { Box } from "shared/ui/box"
import { SaveButton } from "shared/ui/dialog/save-button"
import { CancelButton } from "shared/ui/dialog/cancel-button"
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
}

export const Skeleton = (props: SkeletonProps & { borderRadius?: number }) => {
  const { sx, borderRadius, ...other } = props

  return (
    <MUIBaseSkeleton
      sx={{
        padding: 1,
        borderRadius: borderRadius ?? 2,
        margin: "8px 0px 4px",
        transformOrigin: "top",
        transform: "unset",
        ...sx,
      }}
      {...other}
    />
  )
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
const DialogWrapper = styled((props: DialogWrapperProps) => {
  const { size, ...other } = props

  return <MUIDialog {...other} />
})`
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
    ...other
  } = props

  const store = useEditDialogStore()
  const methods = useFormContext()

  const onClose = () => store.closeDialog()

  const onSubmit = () => {
    methods.handleSubmit(handleSubmit)()
  }

  console.log(other?.PaperProps?.sx)
  return (
    <DialogWrapper
      size={size ?? 580}
      fullScreen={store.fullScreen}
      open={store.open}
      {...other}
      PaperProps={{ sx: other?.PaperProps?.sx ?? {} }}
      // PaperProps={{
      //   sx: {
      //     display: "flex",
      //     borderRadius: 4,
      //     transition: ".2s",
      //     ...(store.fullScreen ? {} : {
      //       maxWidth: 900,
      //       width: 1,
      //       height: size ?? 580,
      //       overflow: "unset",
      //     }),
      //     ...(other?.PaperProps?.sx ?? {}),
      //   },
      // }}
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
