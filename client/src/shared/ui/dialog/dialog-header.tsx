import { Box } from "shared/ui/box"
import { alpha } from "@mui/material"
import { Text } from "shared/ui/text"
import * as React from "react"
import { Vertical } from "shared/ui/divider"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { ReactNode } from "react"
import {
  copyToClipboard,
  readOfClipboard,
} from "shared/lib/utils"
import { useFormContext, UseFormReset } from "react-hook-form"

interface DialogHeaderProps {
  title: string | ReactNode
  hideActions?: boolean
  setData?: (data: any) => void
  setValues?: UseFormReset<any>
  getValues?: ((() => any) | undefined)[]
  settings?: ReactNode
  settingInputs?: Record<string, boolean>
}

export const DialogHeader = observer((props: DialogHeaderProps) => {
  const {
    title, setData, settings, settingInputs, getValues, hideActions = false,
  } = props

  const store = useEditDialogStore()
  const fullscreenState = store.fullScreen ? "fullscreenClose" : "fullscreenOpen"

  const methods = useFormContext()

  return (
    <Box
      flex
      ai
      row
      sx={{
        backgroundImage: ({ background }) => background.hatch.warning,
        backgroundSize: "7px 7px",
        borderRadius: 2,
        p: 1,
        mt: 1,
        mb: 0.5,
        height: 38,
        border: ({ palette }) => `1px solid ${alpha(palette.grey["500"], 0.25)}`,
      }}
    >
      <Text
        sx={{ display: "flex", justifyContent: "center", width: 1 }}
        caption={title}
      />
      {!hideActions && (
        <>
          <IconButton
            onClick={async () => {
              const readData = getValues
                ?.filter((fn): fn is () => any => typeof fn === "function")
                .map((fn) => ({ ...fn() }))
                .reduce((prev, current) => ({ ...prev, ...current }), {})

              const { id, ...otherProperties } = readData
              await copyToClipboard({ ...otherProperties, copied: true })
            }}
            name="copy"
            help={{
              arrow: true,
              disableInteractive: true,
              title: <Text onlyText langBase="global.dialog" name="copy" />,
            }}
          />
          <Vertical sx={{ m: 0 }} />
          <IconButton
            onClick={async () => {
              let readDataOfClipboard = await readOfClipboard()

              if (settingInputs) {
                const filteredReadData = Object
                  .entries(readDataOfClipboard)
                  .filter(([key, value]) => {
                    if (settingInputs[key] === false) return null
                    return [key, value]
                  })

                readDataOfClipboard = Object.fromEntries(filteredReadData)
              }

              const setValues = (data: any) => {
                Object.entries(data)
                  .forEach(([key, value]) => methods.setValue(key, value))
              }

              [setData, setValues].forEach((callback) => (
                typeof callback === "function" && callback(readDataOfClipboard)
              ))
            }}
            name="paste"
            help={{
              arrow: true,
              disableInteractive: true,
              title: <Text onlyText langBase="global.dialog" name="paste" />,
            }}
          />
        </>
      )}
      {settings && <Vertical sx={{ m: 0 }} />}
      {settings}
      <Vertical sx={{ m: 0 }} />
      <IconButton
        onClick={() => store.setFullScreen((fullScreen) => !fullScreen)}
        name={fullscreenState}
        help={{
          arrow: true,
          title: <Text onlyText langBase="global.dialog" name={fullscreenState} />,
        }}
      />
    </Box>
  )
})
