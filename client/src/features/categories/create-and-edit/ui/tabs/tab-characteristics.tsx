import { Box, BoxProps } from "shared/ui/box"
import { CharacteristicsDialog } from "features/characteristics/create-and-edit/ui/dialog"
import { observer } from "mobx-react-lite"
import { Vertical } from "shared/ui/divider"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { DialogDelete } from "features/characteristics/delete/ui/delete"
import React from "react"
import styled from "styled-components"
import { Characteristic } from "entities/characteristic/ui/characteristic"
import { EmptyList } from "shared/ui/empty-list"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { useStores } from "features/categories/create-and-edit/model/context"

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
  const { openDialog } = useEditDialogStore()

  return (
    <IconButtonBase
      name="add"
      onClick={() => openDialog(null)}
    />
  )
}

export const TabCharacteristics = observer(() => {
  const { characteristics } = useStores()
  const { fullScreen } = useEditDialogStore()

  return (
    <RootDialogProvider>
      <Box flex row grow sx={{ height: 1 }}>
        {characteristics.filteredItems.length > 0 ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {characteristics.filteredItems.map((characteristic) => (
              <Characteristic
                key={characteristic.id}
                {...characteristic}
              />
            ))}
            <CharacteristicsDialog />
          </CharacteristicsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <CreateCharacteristicsButton />
          <CharacteristicsDialog />
        </Box>
      </Box>
      <DialogDelete />
    </RootDialogProvider>
  )
})
