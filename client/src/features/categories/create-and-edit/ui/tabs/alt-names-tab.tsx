import { useStores } from "features/categories/create-and-edit/ui/dialog"
import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import React from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { observer } from "mobx-react-lite"
import { useFormContext } from "react-hook-form"
import { AltNameItem } from "entities/alt-name"
import { useGetLocales } from "entities/alt-name/queries/use-get-locales"
import { AltNameEditDialog, AltNameDeleteDialog } from "features/alt-names"

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

export const AltNamesTab = observer(() => {
  const { altNames } = useStores()
  const { fullScreen, openDialog: openEditDialog } = useEditDialogStore()

  const { localesData } = useGetLocales()

  const methods = useFormContext()
  const [caption, description] = methods.watch(["caption", "description"])
  const freeLocales = altNames.getFreeLocale(localesData ?? [])

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {altNames.items.length > 0 ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {altNames.filteredItems.map((altName) => (
              <AltNameItem key={altName.id} {...altName} />
            ))}
          </CharacteristicsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <IconButton
            name="add"
            onClick={() => openEditDialog(null)}
            help={{ title: "Создать", arrow: true }}
          />
          <IconButton
            name="translate"
            disabled={!caption}
            onClick={() => {
              altNames.translate({ caption, description }, freeLocales)
            }}
            help={{ title: "Перевести", arrow: true }}
          />
        </Box>
      </Box>

      <AltNameDeleteDialog />
      <AltNameEditDialog />
    </>
  )
})
