import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import React, { useState } from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { observer } from "mobx-react-lite"
import { useFormContext } from "react-hook-form"
import { AltNameItem } from "entities/alt-name"
import { useGetLocales } from "entities/alt-name/queries/use-get-locales"
import { AltNameEditDialog, AltNameDeleteDialog } from "features/alt-names"
import { Text } from "shared/ui/text"
import { Skeleton } from "@mui/material"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"
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
  const methods = useFormContext()

  const [disabled, setDisabled] = useState(() => (
    ((methods.getValues("caption") as string) ?? "").length !== 3
  ))

  const { localesData } = useGetLocales()

  const freeLocales = altNames.getFreeLocale(localesData ?? [])

  const isShowCharacteristics = altNames.filteredItems.length > 0
  const isShowSkeletons = freeLocales.length > 0 && altNames.isLoading
  const isShowEmptyList = altNames.filteredItems.length === 0 && !altNames.isLoading

  eventBus.on(updateCaption, (event) => {
    if (event.payload.caption.length < 3) setDisabled(true)
    else setDisabled(false)
  })

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
            disabled={disabled}
            isLoading={altNames.isLoading}
            help={{ title: <Text onlyText name="translate" />, arrow: true }}
            onClick={() => {
              const caption = methods.getValues("caption")
              const description = methods.getValues("description")

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