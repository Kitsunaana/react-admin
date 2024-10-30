import {
  Button, ButtonProps, Theme, useTheme,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { Box, BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import styled from "styled-components"
import { galleryStore } from "../model/gallery-store"

export const NavigationContainer = styled(Box)<BoxProps>`
  background-color: ${({ theme: { palette } }) => (palette.mode === "dark" ? "black" : "white")};
  box-shadow: ${({ theme }) => theme.shadows[8]};
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
  border-radius: 12px;
  padding: 6px;
  display: inline-flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 33;
  gap: 6px;
`

export const NavigationButton = styled(Button)<ButtonProps & { theme: Theme }>`
  && {
    background-color: ${({ theme: { palette } }) => (
    palette.primary[palette.mode === "dark" ? "dark" : "light"]
  )};
    min-width: 0;
    padding: 8px;
    border-radius: 8px;
  }
`

export const Navigation = observer(() => {
  const theme = useTheme()

  return (
    <NavigationContainer theme={theme}>
      <NavigationButton
        theme={theme}
        variant="contained"
        color="primary"
        disabled={galleryStore.disabledPrev}
        onClick={galleryStore.setPrevIndexActiveImage}
      >
        <Icon name="next" sx={{ transform: "rotate(180deg)", color: "white" }} />
      </NavigationButton>
      <NavigationButton
        theme={theme}
        variant="contained"
        color="primary"
        disabled={galleryStore.disabledNext}
        onClick={galleryStore.setNextIndexActiveImage}
      >
        <Icon name="next" sx={{ color: "white" }} />
      </NavigationButton>
    </NavigationContainer>
  )
})
