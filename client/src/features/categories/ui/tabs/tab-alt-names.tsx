import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import { useEffect, useState } from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { observer } from "mobx-react-lite"
import { useFormContext } from "react-hook-form"
import { AltNameItem, useLocales } from "entities/alt-name"
import { AltNameCreateDialog, useRemoveAltName } from "features/alt-names"
import { Text } from "shared/ui/text"
import { Skeleton } from "@mui/material"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { AltNameEditDialog } from "features/alt-names/edit/ui/alt-name-edit-dialog"
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
  const { fullScreen, openDialog } = useCreateDialogStore()
  const onRemoveAltName = useRemoveAltName()
  const methods = useFormContext()
  const { locales } = useLocales()

  const getCaptionLength = (caption?: string) => (
    (caption ?? methods.getValues("caption") as string ?? "").length
  )

  const [disabled, setDisabled] = useState(() => getCaptionLength() < 3)

  useEffect(() => { setDisabled(getCaptionLength() < 3) }, [methods.getValues("caption")])

  const freeLocales = altNames.getFreeLocale(locales ?? [])

  const isShowCharacteristics = altNames.filteredItems.length > 0
  const isShowSkeletons = freeLocales.length > 0 && altNames.isLoading
  const isShowEmptyList = altNames.filteredItems.length === 0 && !altNames.isLoading

  eventBus.on(updateCaption, ({ payload }) => {
    setDisabled(getCaptionLength(payload.caption) < 3)
  })

  const handleTranslateClick = () => {
    const caption = methods.getValues("caption")
    const description = methods.getValues("description")

    altNames.translate({ caption, description }, freeLocales)
  }

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {!isShowEmptyList ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {isShowCharacteristics && altNames.filteredItems.map((altName) => (
              <AltNameItem
                key={altName.id}
                onRemove={onRemoveAltName}
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
            onClick={() => openDialog(null)}
            help={{ title: <Text onlyText name="actions.add" /> }}
          />
          <IconButton
            name="translate"
            disabled={disabled}
            isLoading={altNames.isLoading}
            help={{ title: <Text onlyText name="actions.translate" /> }}
            onClick={handleTranslateClick}
          />
        </Box>
      </Box>

      <AltNameCreateDialog />
      <AltNameEditDialog />
    </>
  )
})
