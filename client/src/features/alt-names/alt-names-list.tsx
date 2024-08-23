import { makeAutoObservable } from "mobx"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { RowItem } from "shared/ui/row-item"
import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import { DialogDelete } from "features/characteristics/delete/ui/delete"
import React from "react"
import { useTheme } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { Mark } from "shared/ui/mark"
import { IconButton } from "shared/ui/buttons/icon-button"
import { AltNameDialog } from "features/alt-names/alt-name-dialog"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { ICharacteristic } from "entities/characteristic/model/types"
import { observer } from "mobx-react-lite"
import { AltNameDeleteDialog } from "features/alt-names/alt-name-delete-dialog"

export interface Locale {
  caption: string
  altName: string
  code: string
}

interface IAltName {
  id: number
  caption: string
  lang: Locale
  description?: string

  local?: boolean
  deleted?: boolean
  action?: "create" | "update"
}

export class AltNames {
  items: IAltName[] = [
    {
      id: 1,
      caption: "Pomelo",
      // local: true,
      lang: {
        caption: "English",
        code: "en",
        altName: "EN",
      },
    },
  ]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: IAltName) {
    this.items.push({
      ...data, action: "create", id: Date.now(), local: true,
    })
  }

  edit(data: IAltName) {
    this.items = this.items.map((item) => (item.id === data.id ? {
      ...item, ...data, action: "update", local: true,
    } : item))
  }

  remove(id: number) {
    const removeItem = (item: IAltName) => (item.id === id
      ? { ...item, deleted: true }
      : item)

    this.items = this.items
      .map(removeItem)
      .filter((item): item is IAltName => item !== null)
  }

  exclude(altNames: Locale[]) {
    const haveAltNames = this.filteredItems.map((item) => item.lang.code)

    return altNames.filter((item) => (haveAltNames.includes(item.code) ? null : item))
  }

  get filteredItems() {
    return this.items.filter((item) => item.deleted !== true)
  }

  getData() {
    return {
      locales: this.items.map(({ id, ...other }) => ({ ...other })),
    }
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

export const AltNamesList = observer(() => {
  const { altNames } = useStores()
  const { fullScreen, openDialog: openEditDialog } = useEditDialogStore()
  const { openDialog: openDeleteDialog } = useDeleteDialogStore()

  const theme = useTheme()

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {altNames.items.length > 0 ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {altNames.filteredItems.map((altName) => (
              <RowItem key={altName.id} theme={theme} success={altName.local}>
                <Text caption={altName.caption} />

                <Box flex row ai>
                  <Mark>{altName.lang.caption}</Mark>
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

      <AltNameDeleteDialog />
      <AltNameDialog />
    </>
  )
})
