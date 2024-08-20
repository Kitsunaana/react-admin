import { DialogEdit, DialogStore, useDialogStore } from "shared/ui/dialog/dialog-edit"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { Box } from "shared/ui/box"
import Autocomplete from "@mui/material/Autocomplete"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import { Input } from "shared/ui/input"
import { Select } from "shared/ui/select"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import {
  Context, createContext, FC, PropsWithChildren, useContext, useEffect, useState,
} from "react"
import { makeAutoObservable, toJS } from "mobx"
import { createRootStore, RootStore } from "features/categories/create-and-edit/model/stores/dialog-store"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import {
  characteristicsSchema,
  TCharacteristics,
  transformCharacteristic,
  transformCharacteristics,
} from "features/characteristics/model/schemas"
import { validation } from "shared/lib/validation"

interface ICharacteristic {
  id: string | number
  caption: string
  unit: string | null
  value: string
  hideClient: boolean

  local?: boolean
  deleted?: boolean
  action?: "update" | "create"
}

export class CharacteristicsStore {
  items: Array<ICharacteristic> = [
    // { id: "123", hideClient: false, value: "qqwe", caption: "qew", unit: null, action: "" }
  ]

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: ICharacteristic) {
    this.items.push({
      ...data, id: nanoid(), local: true, action: "create",
    })
  }

  edit(data: ICharacteristic) {
    this.items = this.items.map((item) => (item.id === data.id
      ? {
        ...item, ...data, action: "update", local: true,
      }
      : item))
  }

  remove(id: string | number) {
    const removeItem = (item: ICharacteristic) => (item.id === id
      ? (typeof item.id === "string" ? null : { ...item, deleted: true })
      : item)

    this.items = this.items
      .map(removeItem)
      .filter((item): item is ICharacteristic => item !== null)
  }

  get filteredItems() {
    return this.items.filter((item) => item.deleted !== true)
  }

  getConflict(characteristic: ICharacteristic) {
    return !!this.filteredItems.find((item) => (
      item.caption === characteristic.caption
      && item.id !== characteristic.id
    ))
  }

  getData() {
    return {
      items: this.items.map((item) => ({
        caption: item.caption,
        units: item.unit,
        value: item.value,
        hideClient: item.hideClient,
        action: item.action,
        deleted: item.deleted,
        ...((item?.local && item?.action === "create") ? {} : { id: item.id }),
      })),
    }
  }

  setCharacteristics(characteristics: any) {
    const data = validation(characteristicsSchema, characteristics)
    const transformedCharacteristics = transformCharacteristics(data)

    this.items = [...this.items, ...transformedCharacteristics]
  }
}

interface CharacteristicsDialogProps {
  getData?: () => void
  storeReset?: () => void
  setData?: (dat: any) => void
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
]

const useGetAllCharacteristics = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["characteristics"],
    queryFn: () => $axios.get("/characteristics").then(({ data }) => data),
  })

  return {
    characteristics: data,
    characteristicsIsLoading: isLoading || isFetching,
  }
}

const useGetAllUnits = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["units"],
    queryFn: () => $axios.get("/characteristics/units").then(({ data }) => data),
  })

  return {
    units: data,
    unitsIsLoading: isLoading || isFetching,
  }
}

export const Container = () => {
  const methods = useFormContext()

  const { characteristics, characteristicsIsLoading } = useGetAllCharacteristics()
  const { units, unitsIsLoading } = useGetAllUnits()

  useEffect(() => { methods.trigger() }, [])

  return (
    <Box flex gap sx={{ p: 1, height: 1 }}>
      <Controller
        name="caption"
        rules={{
          required: "Поле должно быть заполнено",
          minLength: {
            value: 3,
            message: "Поле должно быть не менее 3 символов",
          },
        }}
        render={({ field, fieldState }) => (
          <Select
            disabled={characteristicsIsLoading}
            value={field.value}
            freeSolo
            onChange={(event, option) => {
              field.onChange(option)
              methods.trigger()
            }}
            options={(characteristics || []).map((option) => option.caption)}
            InputProps={{
              label: "Название",
              ...field,
              onChange: (event) => {
                field.onChange(event)
                methods.trigger()
              },
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : null,
            }}
          />
        )}
      />

      <Controller
        name="unit"
        render={({ field }) => (
          <Select
            freeSolo
            disabled={unitsIsLoading}
            value={field.value}
            onChange={(event, option) => field.onChange(option)}
            options={(units || [])
              .filter((option) => Boolean(option.caption))
              .map((option) => option.caption)}
            InputProps={{
              label: "Единицы измерения",
              ...field,
            }}
          />
        )}
      />

      <Controller
        name="value"
        rules={{
          required: "Количество символов должно быть больше 1",
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            onChange={(event) => {
              field.onChange(event)
              methods.trigger()
            }}
            size="small"
            label="Значение"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />

      <Controller
        name="hideClient"
        render={({ field }) => (
          <FormControlLabel
            sx={{ alignSelf: "start" }}
            control={<Checkbox {...field} checked={field.value} />}
            label="Скрыть у клиента"
          />
        )}
      />
    </Box>
  )
}

interface UseCharacteristicsFormProps extends Omit<ICharacteristic, "id" | "caption">{
  caption: string | null
}

export const CharacteristicsDialog = observer((props: CharacteristicsDialogProps) => {
  const { storeReset, setData, getData } = props

  const methods = useForm<UseCharacteristicsFormProps>({
    defaultValues: {
      caption: null,
      unit: null,
      value: "",
      hideClient: true,
    },
  })
  const store = useDialogStore()
  const { characteristics } = useStores()

  return (
    <FormProvider {...methods}>
      <DialogEdit
        PaperProps={{
          sx: {
            maxWidth: store.fullScreen ? "95%" : 840,
            maxHeight: "95%",
          },
        }}
        size="auto"
        langBase="characteristics"
        getData={() => {}}
        storeReset={() => {}}
        setData={console.log}
        onSave={characteristics.create}
        onEdit={characteristics.edit}
        container={<Container />}
      />
    </FormProvider>
  )
})
