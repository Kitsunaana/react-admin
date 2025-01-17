import { ReactNode } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { useSettings } from "features/settings"
import { CrossLightIcon } from "./close-icon"

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 3400;
  background-color: rgb(0 0 0 / 0.6);
  backdrop-filter: blur(3px);
  padding: 64px 24px;
  overflow-y: auto;
`

const ModalInner = styled.div<{ mode: "dark" | "light" }>`
  background-color: ${({ mode }) => (
    mode === "light" ? "#fff" : "#121212"
  )};
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
  min-height: 240px;
  border-radius: 16px;
  position: relative;
  margin: 0px auto;
  display: flex;
  width: 100%;
  max-width: 550px;
  flex-direction: column;
  padding: 8px;
`

const CloseButton = styled.button`
  transition: .15s;
  background-color: rgb(255 255 255 / 0.1);
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  display: flex;
  top: 0;
  left: calc(100% + 12px);
  position: absolute;
  padding: 0px;
  margin: 0px;
  color: inherit;
  border: unset;
  cursor: pointer;
  border-radius: 8px;
`

const ModalHeader = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: linear-gradient(315deg, #0000 48%, rgba(237, 108, 2, 0.35) 50%, #0000 52%);
  background-size: 7px 7px;
  border-radius: 12px;
  padding: 8px;
  height: 38px;
  border: 1px solid rgba(158, 158, 158, 0.25);
  justify-content: center;
  margin-bottom: 8px;
`

const Footer = styled.div`
  padding-top: 8px;
  gap: 8px;
  justify-content: flex-end;
  display: flex;
  margin-top: auto;
  display: flex;
`

const Body = styled.div`
    padding: 0px 0px;
`

interface ModalProps {
  children: ReactNode
  isOpen?: boolean
  onClose: () => void
}

export const Modal = (props: ModalProps) => {
  const { onClose, isOpen, children } = props

  const { settings } = useSettings()

  if (!isOpen) return null

  const modal = (
    <ModalWrapper>
      <ModalInner data-id="modal" mode={settings.mode}>
        <CloseButton onClick={onClose}>
          <CrossLightIcon />
        </CloseButton>

        {children}
      </ModalInner>
    </ModalWrapper>
  )

  return createPortal(modal, document.getElementById("modals") as HTMLElement)
}

Modal.Header = function ({ children }: {children: ReactNode}) {
  return (<ModalHeader>{children}</ModalHeader>)
}

Modal.Body = function ({ children }: {children: ReactNode}) {
  return (<Body>{children}</Body>)
}

Modal.Footer = function ({ children }: { children: ReactNode }) {
  return (<Footer>{children}</Footer>)
}
