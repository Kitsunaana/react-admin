import { makeAutoObservable } from "mobx"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { RowItem } from "shared/ui/row-item"
import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { observer } from "mobx-react-lite"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { Characteristic } from "entities/characteristic/ui/characteristic"
import { CharacteristicsDialog } from "features/characteristics/create-and-edit/ui/dialog"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import { DialogDelete } from "features/characteristics/delete/ui/delete"
import React from "react"
import { useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { Mark } from "shared/ui/mark"
import { CreateButton } from "shared/ui/buttons/create-button"
import { IconButton } from "shared/ui/buttons/icon-button"
import { AltNameDialog } from "features/alt-names/alt-name-dialog"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"

interface IAltName {
  id: number
  caption: string
  lang: string
  description?: string

  local?: boolean
  deleted?: boolean
  action?: "create" | "update"
}

export class AltNames {
  items: IAltName[] = [
    {
      id: 1, caption: "Pomelo", lang: "English", local: true,
    },
  ]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
}

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

export const AltNamesList = () => {
  const { altNames } = useStores()
  const { fullScreen, openDialog: openEditDialog } = useEditDialogStore()
  const { openDialog: openDeleteDialog } = useDeleteDialogStore()

  const theme = useTheme()

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {altNames.items.length > 0 ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {altNames.items.map((altName) => (
              <RowItem key={altName.id} theme={theme} success={altName.local}>
                <Text caption={altName.caption} />

                <Box flex row ai>
                  <Mark>{altName.lang}</Mark>
                  <Vertical />
                  <IconButtonEdit onClick={() => openEditDialog(altName.id, altName)} />
                  <IconButtonDelete onClick={() => openDeleteDialog(altName.id, {
                    caption: altName.caption,
                  })}
                  />
                </Box>
              </RowItem>
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
            help={{ title: "Перевести", arrow: true }}
          />
        </Box>
      </Box>

      <DialogDelete />
      <AltNameDialog />
    </>
  )
}
