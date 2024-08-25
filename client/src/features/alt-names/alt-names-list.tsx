import { makeAutoObservable, toJS } from "mobx"
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
import { useGetLocales } from "features/alt-names/queries"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"

function generateRandomNumber(): number {
  let result = ""
  while (result.length < 16) result += Math.floor(Math.random() * 10)
  return Number(result)
}

export interface Locale {
  caption: string
  altName: string
  code: string
}

export interface IAltName {
  id: number
  caption: string
  locale: Locale
  description?: string | null

  local?: boolean
  deleted?: boolean
  edited?: boolean
  action?: "create" | "update"
}

interface ITranslate {
  trans: {
    caption: string
    description?: string | null
  }
}

type FetchTranslateData = Array<{ data: ITranslate, locale: Locale }>

export class AltNames {
  items: IAltName[] = []

  constructor() {
    makeAutoObservable(this, { selectedLocale: false }, { autoBind: true })
  }

  create(data: IAltName) {
    this.items.push({
      ...data, action: "create", id: Date.now(), local: true,
    })
  }

  getFreeLocale(locales: Locale[]) {
    const busyLocales = this.filteredItems.map((item) => item.locale.code)

    return locales.filter((locale) => (busyLocales.includes(locale.code) ? null : locale))
  }

  isLoading = false
  translate(category: { caption: string; description: string | null }, locales: Locale[]) {
    this.isLoading = true

    const URL = "https://google-translate113.p.rapidapi.com/api/v1/translator/json"

    Promise.all(
      this.getFreeLocale(locales).map((locale) => {
        const data = {
          from: "auto",
          to: locale.code,
          json: {
            caption: category.caption,
            description: category.description,
          },
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
            "x-rapidapi-key": "96f8c6e5a6msh97a27abce15673ap184725jsn5eb78c1312cd",
          },
        }

        return axios.post(URL, data, config)
          .then(({ data }) => ({ data, locale }))
      }),
    )
      .then((response) => this.addTranslateAltNames(response))
      .catch(console.log)
  }

  addTranslateAltNames(altNames: FetchTranslateData) {
    const items: IAltName[] = altNames.map((item) => ({
      ...item.data.trans,
      id: generateRandomNumber(),
      locale: item.locale,
      local: true,
      action: "create",
    }))

    this.items = [...this.items, ...items]
  }

  edit(data: IAltName) {
    this.items = this.items.map((item) => (item.id === data.id ? {
      ...item, ...data, action: "update", edited: true,
    } : item))
  }

  remove(id: number) {
    const removeItem = (item: IAltName) => (item.id === id
      ? ({ ...item, deleted: true })
      : item)

    this.items = this.items
      .map(removeItem)
      .filter((item): item is IAltName => item !== null)
  }

  selectedLocale: Locale | null = null
  exclude(altNames: Locale[], nonExclude: Locale | null) {
    const haveAltNames = this.filteredItems.map((item) => item.locale.code)

    if (nonExclude !== null) this.selectedLocale = nonExclude

    return altNames.map((item) => {
      if (haveAltNames.includes(item.code) && this.selectedLocale?.code !== item.code) {
        return { ...item, disabled: true }
      }

      return item
    })
  }

  get filteredItems() {
    return this.items.filter((item) => item.deleted !== true)
  }

  getData() {
    return {
      altNames: this.items.map(({ id, ...other }) => ({
        ...other,
        ...(other.local ? { } : { id }),
      })),
    }
  }

  setAltNames(altNames: any[]) {
    this.items = altNames
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
              <RowItem key={altName.id} theme={theme} success={altName.edited}>
                <Text caption={altName.caption} />

                <Box flex row ai>
                  <Mark>{altName.locale.caption}</Mark>
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
            disabled={!caption}
            onClick={() => {
              altNames.translate({ caption, description }, freeLocales)
            }}
            help={{ title: "Перевести", arrow: true }}
          />
        </Box>
      </Box>

      <AltNameDeleteDialog />
      <AltNameDialog />
    </>
  )
})
