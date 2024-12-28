export const altCtrlKey = (callback: (event: KeyboardEvent) => void) => (
  (event: KeyboardEvent) => {
    if (event.altKey && event.ctrlKey) callback(event)
  }
)

export const shiftCtrlKey = (callback: (event: KeyboardEvent) => void) => (
  (event: KeyboardEvent) => {
    if (event.shiftKey && event.ctrlKey) callback(event)
  }
)

export const ctrlKey = (callback: (event: KeyboardEvent) => void) => (
  (event: KeyboardEvent) => {
    if (event.ctrlKey) callback(event)
  }
)
