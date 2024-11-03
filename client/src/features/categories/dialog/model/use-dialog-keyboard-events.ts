import { useKeyboard } from "shared/lib/keyboard-manager"

interface UseKeyboardEventsOptions {
  open: boolean
  canRedo: boolean
  canUndo: boolean
  onUndo: () => void
  onRedo: () => void
  onToggleFullscreen: () => void
}

export const useDialogKeyboardEvents = (options: UseKeyboardEventsOptions) => {
  const {
    open,
    canRedo,
    canUndo,
    onRedo,
    onUndo,
    onToggleFullscreen,
  } = options

  useKeyboard({
    key: "z",
    disabled: !open,
    callback: ({ ctrlKey }) => {
      if (ctrlKey && canUndo) onUndo()
    },
  })

  useKeyboard({
    key: "Z",
    disabled: !open,
    callback: ({ ctrlKey, shiftKey }) => {
      if (ctrlKey && shiftKey && canRedo) onRedo()
    },
  })

  useKeyboard({
    key: "f",
    disabled: !open,
    callback: ({ ctrlKey, altKey }) => {
      if (ctrlKey && altKey) onToggleFullscreen()
    },
  })
}
