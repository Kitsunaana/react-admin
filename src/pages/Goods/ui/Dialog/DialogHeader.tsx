import { Dispatch, memo, SetStateAction } from "react"
import { Box } from "shared/ui/Box"
import { alpha, IconButton } from "@mui/material"
import { Text } from "shared/ui/Text"
import { Icon } from "shared/ui/Icon"
import * as React from "react"

interface DialogHeaderProps {
  fullScreen: boolean
  setFullScreen: Dispatch<SetStateAction<boolean>>
}

export const DialogHeader = memo((props: DialogHeaderProps) => {
  const { fullScreen, setFullScreen } = props

  return (
    <Box
      flex
      ai
      row
      sx={{
        backgroundImage: ({ background }) => background.hatch.warning,
        backgroundSize: "7px 7px",
        borderRadius: 1,
        p: 1,
        mx: 1,
        mt: 1,
        mb: 0.5,
        height: 38,
        border: ({ palette }) => `1px solid ${alpha(palette.grey["500"], 0.25)}`,
      }}
    >
      <Text sx={{ display: "flex", justifyContent: "center", width: 1 }} caption="Создание товара" />
      <IconButton
        sx={{ p: 0.5 }}
        onClick={() => setFullScreen((prevState) => !prevState)}
      >
        <Icon
          name={fullScreen ? "fullscreenClose" : "fullscreenOpen"}
        />
      </IconButton>
    </Box>
  )
})
