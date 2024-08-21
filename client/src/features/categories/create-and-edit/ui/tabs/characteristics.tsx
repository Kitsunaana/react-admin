import { Box, BoxProps } from "shared/ui/box"
import { CharacteristicsDialog } from "features/characteristics/create-and-edit/ui/dialog"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { observer } from "mobx-react-lite"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import { Icon } from "shared/ui/icon"
import { DialogDelete } from "features/characteristics/delete/ui/delete"
import { Text } from "shared/ui/text"
import React from "react"
import {
  StoreDeleteDialogProvider,
  StoreDialogProvider,
  useDialogStore,
} from "shared/ui/dialog/model/dialog-context"
import styled from "styled-components"
import { Characteristic } from "entities/characteristic/ui/characteristic"
import { EmptyList } from "shared/ui/empty-list"

const CharacteristicsContainer = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
  height: ${({ fullScreen }) => (fullScreen ? "calc(100% - 60px)" : "432px")};
`

export const CreateCharacteristicsButton = () => {
  const { openDialog } = useDialogStore()

  return (
    <IconButton
      name="add"
      onClick={() => openDialog(null)}
    />
  )
}

export const Characteristics = observer(() => {
  const { characteristics } = useStores()
  const { fullScreen } = useDialogStore()

  return (
    <StoreDeleteDialogProvider>
      <Box flex row grow sx={{ height: 1 }}>
        {characteristics.filteredItems.length > 0 ? (
          <StoreDialogProvider>
            <CharacteristicsContainer fullScreen={fullScreen}>
              {characteristics.filteredItems.map((characteristic) => (
                <Characteristic
                  key={characteristic.id}
                  {...characteristic}
                />
              ))}
              <CharacteristicsDialog />
            </CharacteristicsContainer>
          </StoreDialogProvider>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <StoreDialogProvider>
            <CreateCharacteristicsButton />
            <CharacteristicsDialog />
          </StoreDialogProvider>
        </Box>
      </Box>
      <DialogDelete />
    </StoreDeleteDialogProvider>

  )
})
