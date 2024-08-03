import {
  Dispatch, memo, SetStateAction,
} from "react"
import { Box } from "shared/ui/box"
import { alpha, Tooltip } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import * as React from "react"
import { Vertical } from "shared/ui/divider"

interface DialogHeaderProps {
  fullScreen: boolean
  setFullScreen: Dispatch<SetStateAction<boolean>>
  title: string
  hideActions?: boolean
}

export const DialogHeader = memo((props: DialogHeaderProps) => {
  const {
    fullScreen, setFullScreen, title, hideActions = false,
  } = props

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
              <IconButton
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
              <IconButton
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
          <IconButton
            onClick={() => setFullScreen((prevState) => !prevState)}
            name={fullScreen ? "fullscreenClose" : "fullscreenOpen"}
          />
        </div>
      </Tooltip>
    </Box>
  )
})
