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
import { Text } from "shared/ui/text"
import { Skeleton } from "@mui/material"
import { useStores } from "../../model/context"

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

export const TabAltNames = observer(() => {
  const { altNames } = useStores()
  const { fullScreen, openDialog: openEditDialog } = useEditDialogStore()

  const { localesData } = useGetLocales()

  const methods = useFormContext()
  const [caption, description] = methods.watch(["caption", "description"])
  const freeLocales = altNames.getFreeLocale(localesData ?? [])

  const isShowCharacteristics = altNames.filteredItems.length > 0
  const isShowSkeletons = freeLocales.length > 0 && altNames.isLoading
  const isShowEmptyList = altNames.filteredItems.length === 0 && !altNames.isLoading

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {!isShowEmptyList ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {isShowCharacteristics && altNames.filteredItems.map((altName) => (
              <AltNameItem
                key={altName.id}
                disabled={altNames.isLoading}
                {...altName}
              />
            ))}

            {isShowSkeletons && freeLocales.map(({ id }) => (
              <Skeleton
                key={id}
                sx={{ borderRadius: 2, mb: 0.5 }}
                height={40}
                variant="rectangular"
              />
            ))}
          </CharacteristicsContainer>
        ) : (<EmptyList />)}
        <Vertical />
        <Box sx={{ pt: 1 }} flex ai>
          <IconButton
            name="add"
            isLoading={altNames.isLoading}
            onClick={() => openEditDialog(null)}
            help={{ title: <Text onlyText name="add" />, arrow: true }}
          />
          <IconButton
            name="translate"
            isLoading={altNames.isLoading}
            disabled={!caption}
            help={{ title: <Text onlyText name="translate" />, arrow: true }}
            onClick={() => {
              altNames.translate({ caption, description }, freeLocales)
            }}
          />
        </Box>
      </Box>

      <AltNameDeleteDialog altNames={altNames} />
      <AltNameEditDialog altNames={altNames} />
    </>
  )
})
