import { Dialog as MUIDialog } from "@mui/material"
import { DialogProps as MUIDialogProps } from "@mui/material/Dialog/Dialog"
import { styled } from "@mui/material/styles"
import { HTMLAttributes, ReactNode } from "react"
import { Box } from "shared/ui/box"
import { Skeleton } from "shared/ui/skeleton"
import styledComponent, { css } from "styled-components"
import { useModalStore } from "shared/hooks/use-modal-store"
import { observer } from "mobx-react-lite"

const ButtonContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: 8,
  alignSelf: "flex-end",
  padding: 8,
  width: "100%",
}))

type DialogWrapperProps = MUIDialogProps & HTMLAttributes<HTMLDivElement> & {
  fullScreen: boolean
  size: "auto" | number
}

const DialogWrapper = styledComponent(({ size, ...other }: DialogWrapperProps) => <MUIDialog {...other} />)`
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

export const ModalWrapper = observer(({
  open,
  size,
  children,
  nesting = 1,
}: {
  open: boolean
  size?: "auto"
  children?: ReactNode
  nesting?: number
}) => {
  const modal = useModalStore()

  return (
    <DialogWrapper
      open={open}
      fullScreen={modal.fullscreen}
      size={size ?? "auto"}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          maxWidth: modal.fullscreen
            ? `${100 - ((nesting - 1) * 5)}% !important`
            : `${900 - (nesting - 1) * 60}px !important`,
          maxHeight: `${100 - ((nesting - 1) * 5)}% !important`,
          ...(modal.fullscreen && nesting === 1
            ? { borderRadius: "0px !important" }
            : {}),
        },
      }}
    >
      {children}
    </DialogWrapper>
  )
})

export const ModalContainer = observer(({
  header,
  tabs,
  body,
  footer,
  height,
  isLoading,
}: {
  header?: ReactNode
  tabs?: ReactNode
  body?: ReactNode
  footer?: {
    right?: ReactNode,
    left?: ReactNode
  }
  height?: number | string
  isLoading?: boolean
}) => (
  <>
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
          ) : (body)}
        </Box>
      </Box>
    </Box>
    <ButtonContainer>
      {footer?.left}
      <Box flex row ai gap ml="auto" mr={0}>
        {footer?.right}
      </Box>
    </ButtonContainer>
  </>
))
