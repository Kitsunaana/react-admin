import { Box, BoxProps } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { Vertical } from "shared/ui/divider"
import React from "react"
import styled from "styled-components"
import { Characteristic } from "entities/characteristic/ui/characteristic"
import { EmptyList } from "shared/ui/empty-list"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { useStores } from "features/categories/edit/model/context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useTranslation } from "react-i18next"
import { CharacteristicDeleteDialog, CharacteristicEditDialog } from "features/characteristics"

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
  const { t } = useTranslation()

  return (
    <IconButton
      help={{
        arrow: true,
        title: t("global.add"),
      }}
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
          </CharacteristicsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <CreateCharacteristicsButton />
        </Box>
      </Box>

      <CharacteristicEditDialog />
      <CharacteristicDeleteDialog />
    </RootDialogProvider>
  )
})
