import { Box } from "shared/ui/box"
import { alpha } from "@mui/material"
import { Text } from "shared/ui/text"
import * as React from "react"
import { Vertical } from "shared/ui/divider"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { ReactNode } from "react"
import {
  copyToClipboard,
  readOfClipboard,
} from "shared/lib/utils"
import { useFormContext, UseFormReset } from "react-hook-form"

interface DialogHeaderProps {
  title: string | ReactNode
  hideActions?: boolean
  dataToCopy?: any
  setData?: (data: any) => void
  setValues?: UseFormReset<any>
}

export const DialogHeader = observer((props: DialogHeaderProps) => {
  const {
    title, dataToCopy = {}, setData, setValues, hideActions = false,
  } = props

  const store = useEditDialogStore()

  const fullscreenState = store.fullScreen ? "fullscreenClose" : "fullscreenOpen"

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
      <Text sx={{ display: "flex", justifyContent: "center", width: 1 }} caption={title} />
      {!hideActions && (
        <>
          <IconButton
            onClick={() => copyToClipboard({ ...dataToCopy, caption: `${dataToCopy.caption} copy` })}
            name="copy"
            help={{
              arrow: true,
              disableInteractive: true,
              title: <Text onlyText name="copy" />,
            }}
          />
          <Vertical sx={{ m: 0 }} />
          <IconButton
            onClick={async () => {
              setData?.(await readOfClipboard())
              setValues?.(await readOfClipboard())
            }}
            name="paste"
            help={{
              arrow: true,
              disableInteractive: true,
              title: <Text onlyText name="paste" />,
            }}
          />
        </>
      )}
      <Vertical sx={{ m: 0 }} />
      <IconButton
        onClick={() => store.setFullScreen((fullScreen) => !fullScreen)}
        name={fullscreenState}
        help={{
          arrow: true,
          title: <Text onlyText name={fullscreenState} />,
        }}
      />
    </Box>
  )
})
