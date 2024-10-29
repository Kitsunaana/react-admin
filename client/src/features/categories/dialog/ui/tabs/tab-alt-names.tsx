import { Skeleton } from "@mui/material"
import {
  AltNameItem, openCreateAltNameDialog, openEditAltNameDialog, useLocales,
} from "entities/alt-name"
import { useRemoveAltName } from "features/alt-names"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { eventBus } from "shared/lib/event-bus"
import { Box, BoxProps } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import styled from "styled-components"
import { updateCaption } from "features/categories/@dialog/domain/event"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { nanoid } from "nanoid"
import { useCategoryStores } from "../context"

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

const getCaptionLength = (caption?: string) => (caption ?? "").length

interface TabAltNamesProps {
  tab: number
}

export const TabAltNames = observer(({ tab }: TabAltNamesProps) => {
  const { locales } = useLocales()
  const { altNames, historyStore } = useCategoryStores()
  const { fullScreen } = useCreateDialogStore()

  const onRemoveAltName = useRemoveAltName(altNames.remove)
  const methods = useFormContext()

  const [disabled, setDisabled] = useState(getCaptionLength(methods.getValues("caption")) < 3)

  useEventBusListen(updateCaption, ({ payload }) => {
    setDisabled(getCaptionLength(payload.caption) < 3)
  })

  const freeLocales = altNames.getFreeLocale(locales ?? [])

  const isShowCharacteristics = altNames.filteredItems.length > 0
  const isShowSkeletons = freeLocales.length > 0 && altNames.isLoading
  const isShowEmptyList = altNames.filteredItems.length === 0 && !altNames.isLoading

  const handleTranslateClick = () => {
    const caption = methods.getValues("caption")
    const description = methods.getValues("description")

    altNames.translate({ caption, description }, freeLocales)
  }

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {!isShowEmptyList ? (
        <CharacteristicsContainer fullScreen={fullScreen}>
          {isShowCharacteristics && altNames.filteredItems.map((altName) => (
            <AltNameItem
              key={altName.id}
              disabled={altNames.isLoading}
              handleRemove={async (payload) => {
                await onRemoveAltName(payload)

                historyStore.recordEvent({
                  id: nanoid(),
                  tab,
                  type: "removeAltName",
                  value: payload.id,
                })
              }}
              handleEdit={(payload) => eventBus.emit(openEditAltNameDialog(payload))}
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
          onClick={() => eventBus.emit(openCreateAltNameDialog({}))}
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
  )
})
