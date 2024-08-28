import {
  memo,
} from "react"
import { Box } from "shared/ui/box"
import { alpha, Tooltip } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import * as React from "react"
import { Vertical } from "shared/ui/divider"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { shallowEqual } from "shared/lib/utils"

interface DialogHeaderProps {
  title: string
  hideActions?: boolean
}

export const DialogHeader = observer((props: DialogHeaderProps) => {
  const {
    title, hideActions = false,
  } = props

  const store = useEditDialogStore()

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
          <Tooltip
            arrow
            disableInteractive
            title="Скопировать данные для переноса"
          >
            <div>
              <IconButtonBase
                name="copy"
              />
            </div>
          </Tooltip>
          <Vertical sx={{ m: 0 }} />
          <Tooltip
            disableInteractive
            arrow
            title="Загрузить скопированные данные"
          >
            <div>
              <IconButtonBase
                name="paste"
              />
            </div>
          </Tooltip>
        </>
      )}
      <Vertical sx={{ m: 0 }} />
      <Tooltip
        arrow
        disableInteractive
        title="Развернуть на весь экран"
      >
        <div>
          <IconButtonBase
            onClick={() => store.setFullScreen((fullScreen) => !fullScreen)}
            name={store.fullScreen ? "fullscreenClose" : "fullscreenOpen"}
          />
        </div>
      </Tooltip>
    </Box>
  )
})
